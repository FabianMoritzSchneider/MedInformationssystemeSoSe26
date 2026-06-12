import { connectMongo,closeMongo } from './db.js'
import { getPatient } from './fhirClient.js'
import { savePatient } from './patientRepository.js'

const run = async () => {
  try {
    await connectMongo()

    // const patientId = '134908600' // Max Mustermann
    const patientId = '90286136' 
    const fhirPatient = await getPatient(patientId)
    const savedPatient = await savePatient(fhirPatient)

    console.log('Patient gespeichert:')
    console.log(savedPatient)
  } catch (err) {
    console.error(err)
  } finally {
    await closeMongo()
  }
}


run()