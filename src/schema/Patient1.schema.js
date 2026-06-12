import mongoose from 'mongoose'

const Patient1Schema = new mongoose.Schema({
    patientId: { type: String, required: true, unique: true },
    familyName: { type: String, required: true },
    givenName: [String],
    birthDate: { type: String }
})

export default mongoose.model('Patient1', Patient1Schema)