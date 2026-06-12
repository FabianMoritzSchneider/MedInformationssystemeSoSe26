import mongoose from 'mongoose'

const patientSchema = new mongoose.Schema({
  resourceType: { type: String, default: 'Patient' },
  fhirId: { type: String, required: true, unique: true },
  identifier: [{ system: String, value: String }],
  name: [{ family: String, given: [String] }],
  gender: String,
  birthDate: String,
  resource: { type: Object, required: true }
}, {
  timestamps: true
})

const conditionSchema = new mongoose.Schema({
  resourceType: { type: String, default: 'Condition' },
  fhirId: { type: String, required: true, unique: true },
  patientFhirId: { type: String, required: true },
  code: { type: Object },
  text: String,
  status: String,
  category: [Object],
  resource: { type: Object, required: true }
}, {
  timestamps: true
})

const PatientModel = mongoose.models.Patient || mongoose.model('Patient', patientSchema)
const ConditionModel = mongoose.models.Condition || mongoose.model('Condition', conditionSchema)

export { PatientModel, ConditionModel }
