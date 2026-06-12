import fs from 'node:fs/promises'


export const getPatient = async (patientId) => {
  const patient = await fetch(`https://hapi.fhir.org/baseR4/Patient/${patientId}`)
  const result = await patient.json()
  console.log(result)
  return result
}

// const patientId = 
// getPatient(patientId)