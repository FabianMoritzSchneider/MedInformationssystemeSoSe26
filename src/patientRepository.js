import Patient from "./schemas/Patient.Schema.js"

export const savePatient = async (fhirPatient) => {
    const patient = new Patient({
    patientId: fhirPatient.id,
    familyName: fhirPatient.name[0].family ?? 'unknown',
    givenName: fhirPatient.name[0].given[0] ?? [],
    gender: fhirPatient.gender ?? 'unknown'
  })

  return patient.save()
}