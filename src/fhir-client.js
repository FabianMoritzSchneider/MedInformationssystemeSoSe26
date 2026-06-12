import fs from 'node:fs/promises'
import { connectMongo, closeMongo } from './db.js'
import { PatientModel, ConditionModel } from './models.js'
import { searchPatient, createPatient, createCondition } from './fhir-service.js'

const patientSearch = {
  family: 'Mustermann',
  given: 'Max',
  birthDate: '1980-07-12',
  identifier: {
    system: 'http://example.org/insurance',
    value: 'KV-123456789'
  }
}

const patientPayload = {
  resourceType: 'Patient',
  identifier: [
    {
      system: patientSearch.identifier.system,
      value: patientSearch.identifier.value
    }
  ],
  name: [
    {
      family: patientSearch.family,
      given: [patientSearch.given]
    }
  ],
  gender: 'male',
  birthDate: patientSearch.birthDate,
  telecom: [
    {
      system: 'phone',
      value: '+49-30-1234567',
      use: 'home'
    }
  ],
  address: [
    {
      line: ['Musterstrasse 1'],
      city: 'Berlin',
      postalCode: '10115',
      country: 'DE'
    }
  ]
}

const conditionPayload = (patientId) => ({
  resourceType: 'Condition',
  clinicalStatus: {
    coding: [
      {
        system: 'http://terminology.hl7.org/CodeSystem/condition-clinical',
        code: 'active',
        display: 'Active'
      }
    ]
  },
  verificationStatus: {
    coding: [
      {
        system: 'http://terminology.hl7.org/CodeSystem/condition-ver-status',
        code: 'confirmed',
        display: 'Confirmed'
      }
    ]
  },
  category: [
    {
      coding: [
        {
          system: 'http://terminology.hl7.org/CodeSystem/condition-category',
          code: 'encounter-diagnosis',
          display: 'Encounter Diagnosis'
        }
      ]
    }
  ],
  severity: {
    coding: [
      {
        system: 'http://snomed.info/sct',
        code: '24484000',
        display: 'Severe'
      }
    ]
  },
  code: {
    coding: [
      {
        system: 'http://snomed.info/sct',
        code: '195967001',
        display: 'Acute bronchitis'
      }
    ],
    text: 'Akute Bronchitis'
  },
  subject: {
    reference: `Patient/${patientId}`
  },
  onsetDateTime: new Date().toISOString().slice(0, 10),
  recordedDate: new Date().toISOString(),
  note: [
    {
      text: 'Diagnose aus der Notaufnahme mit Aufnahmegrund Husten und Fieber.'
    }
  ]
})

const persistPatient = async (resource) => {
  return PatientModel.findOneAndUpdate(
    { fhirId: resource.id },
    {
      resourceType: 'Patient',
      fhirId: resource.id,
      identifier: resource.identifier ?? [],
      name: resource.name ?? [],
      gender: resource.gender,
      birthDate: resource.birthDate,
      resource
    },
    { upsert: true, returnDocument: 'after' }
  )
}

const persistCondition = async (resource) => {
  return ConditionModel.findOneAndUpdate(
    { fhirId: resource.id },
    {
      resourceType: 'Condition',
      fhirId: resource.id,
      patientFhirId: resource.subject?.reference?.replace(/^Patient\//, '') ?? null,
      code: resource.code ?? {},
      text: resource.code?.text ?? '',
      status: resource.clinicalStatus?.coding?.[0]?.code ?? resource.verificationStatus?.coding?.[0]?.code,
      category: resource.category ?? [],
      resource
    },
    { upsert: true, returnDocument: 'after' }
  )
}

const runJourney = async () => {
  await connectMongo()

  let patientResource = null
  const foundPatients = await searchPatient(patientSearch)

  if (foundPatients.length > 0) {
    patientResource = foundPatients[0]
    console.log(`Patient gefunden: ${patientResource.id}`)
  } else {
    console.log('Patient nicht gefunden, erstelle Patient im FHIR-Testserver...')
    patientResource = await createPatient(patientPayload)
    console.log(`Patient angelegt: ${patientResource.id}`)
  }

  await persistPatient(patientResource)
  console.log(`Patient in MongoDB gespeichert: ${patientResource.id}`)

  const conditionResource = await createCondition(conditionPayload(patientResource.id))
  await persistCondition(conditionResource)

  console.log(`Diagnose erstellt und gespeichert: ${conditionResource.id}`)

  await fs.writeFile('patient-journey-result.json', JSON.stringify({ patientResource, conditionResource }, null, 2))
  console.log('Ergebnisdatei geschrieben: patient-journey-result.json')
}

runJourney()
  .catch((error) => {
    console.error('Fehler beim Patienten-Journey-Durchlauf:', error)
  })
  .finally(async () => {
    await closeMongo()
  })
''