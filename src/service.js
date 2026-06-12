import mongoose from 'mongoose'

import { nanoid } from 'nanoid'

import Patient1 from './schema/Patient1.schema.js' // faktisch kriegen wir hier eine Klasse aus unserem Schema

const main = async () => {
    const db = await mongoose.connect('mongodb://127.0.0.1:27017/test')
    console.log('Connected...')

    try {
    const patient = new Patient1({ givenName: ['Tim'] })
    patient.familyName = 'Kuch'
    patient.set('gender', 'male')
    patient.set('familyName', 'Schmidt') // letztes überschreibt immmer
    // patient.patientId = '124'
    await patient.save()
    } catch(e) {
        console.error('Bad Request')
        console.error(e)
    }
}

try {
    main()
} catch(e) {
    console.error(e)
}