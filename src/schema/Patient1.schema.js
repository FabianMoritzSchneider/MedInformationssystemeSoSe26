import mongoose from 'mongoose'
import { nanoid } from 'nanoid'

const Patient1Schema = new mongoose.Schema({
    patientId: { type: String, required: true, unique: true, index: true, default: nanoid() },
    timestamp: { type: String, default: Date.now() },
    familyName: { type: String, required: true },
    givenName: [String],
    gender: { type: String },
    birthDate: { type: String }
})

export default mongoose.model('Patient1', Patient1Schema)