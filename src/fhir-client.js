import fs from 'node:fs/promises'
// immer asynchrone Variante benutzen bei import (also mit /promises)

/*
let message = 'Hello'
const where = 'World'

console.log(message + ' ' + where + '!')
console.log(`${message} ${where}!`) // bevorzugt zum oberen da übersichtlicher

// "normale Funktion"
function run1 () {
    console.log(`${message} ${where}!`)
}

// Error function (Variablendeklaration mit anonymer Funktion dahinter) - funktioniert ähnlich wie function run1 () - idR hier verwendet
const run2 = () => {
    console.log(`${message} ${where}!`)
}
// Funktion aufrufen mit Funktionsnamen()
// run2()
*/



const searchPatients = async (id) => {
    const endpoint = 'https://hapi.fhir.org/baseR4/Patient/_search'
    const request = `${endpoint}?_id=${id}`
    const result = await fetch(request)
    const bundle = await result.json()
    if (bundle.total==0) 
        return []
    //return bundle
    return bundle.entry.map(entry => entry.resource)
}

const searchMedicationForPatients = async (patientId) => {
    const endpoint = 'https://hapi.fhir.org/baseR4/MedicationRequest/_search'
    const request = `${endpoint}?subject=${patientId}`
    const result = await fetch(request)
    const bundle = await result.json()
    if (bundle.total==0) 
        return []
    //return bundle
    return bundle.entry.map(entry => entry.resource)
}
// 


// asynchrone Funktion -> quasi wie multi threading, Teil unseres Codes kann laufen während anderer Teil noch auf Antwort vom Server wartet zB
const getPatient = async (id) => {
    const result = await fetch(`https://hapi.fhir.org/baseR4/Patient/${id}`) // https://hapi.fhir.org/baseR4/Patient/90286136    131284146      131264020
    // const text = await result.text() 
    // const json = await result.json() 
    // await fs.writeFile('patient.json', JSON.stringify(patient, undefined, 2))
    // console.log(result)
    // console.log(text)
    // console.log(json)
    //console.log(patient.name[0].given[0])
    //console.log(patient.gender)
    //console.log(patient.birthDate)
    return result.json()
}
// wenn ein Promise zurückgegeben wird müssen wird darauf warten -> await davor!


const getMedicationRequest = async (id) => {
    const result = await fetch(`https://hapi.fhir.org/baseR4/MedicationRequest/${id}`)     // 131264024
    // const medication = await result.json()
    // await fs.writeFile('medication.json', JSON.stringify(medication, undefined, 2))
    // console.log(medication)
    return result.json()
}


const run = async () => {
    // await getPatient("131264020")
    const testPatient = await getPatient("131264020")
    // console.log(testPatient)
    console.log(testPatient.name[0].given[0])
    console.log(testPatient.name[0].family)
    console.log(testPatient.gender)
    console.log(testPatient.birthDate)
    const testMedication = await getMedicationRequest("131264024")
    console.log(testMedication.subject.reference)
    const searchResultP = await searchPatients("131264020")
    //console.log(searchResultP[0])
    const searchResultM = await searchMedicationForPatients("131264020")
    //console.log(searchResultM[0])

    const foundPatients = await searchPatients("131264020")
    console.log(foundPatients.length)
    if (foundPatients.length > 0) {
        const patientResource = foundPatients[0]
        console.log(`Patient gefunden: ${patientResource.id}`)
    } else {
        console.log('Patient nicht gefunden, erstelle Patient im FHIR-Testserver...')
        //patientResource = await createPatient(patientPayload)
        //console.log(`Patient angelegt: ${patientResource.id}`)
    }
}

run()