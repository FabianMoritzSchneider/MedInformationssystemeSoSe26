// immer asynchrone Variante benutzen bei import (also mit /promises)
import fs from 'node:fs/promises'

let message = 'Hello'
const where = 'World'


// console.log(message + ' ' + where + '!')
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
//run2()


// asynchrone Funktion -> quasi wie multi threading, Teil unseres Codes kann laufen während anderer Teil noch auf Antwort vom Server wartet zB
const getPatient = async () => {
    const result = await fetch('https://hapi.fhir.org/baseR4/Patient/131264020') // https://hapi.fhir.org/baseR4/Patient/90286136    131284146
    // const text = await result.text() 
    // const json = await result.json() 
    const patient = await result.json()
    await fs.writeFile('patient.json', JSON.stringify(patient, undefined, 2))
    //console.log(result)
    // console.log(text)
    // console.log(json)
    console.log(patient.name[0].given[0])
    console.log(patient.gender)
    console.log(patient.birthDate)
}
// wenn ein Promise zurückgegeben wird müssen wird darauf warten -> await davor!


const getMedicationRequest = async () => {
    const result = await fetch('https://hapi.fhir.org/baseR4/MedicationRequest/131264024') 
    const medication = await result.json()
    await fs.writeFile('medication.json', JSON.stringify(medication, undefined, 2))
    console.log(medication)
}


const run = async () => {
    await getPatient()
    await getMedicationRequest()
}

run()