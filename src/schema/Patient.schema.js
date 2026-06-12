import mongoose from 'mongoose'

const PatientSchema = new mongoose.Schema({
  resourceType: { type: String, default: 'Patient' },
  fhirId: { type: String, required: true, unique: true },
  identifier: [{ system: String, value: String }],
  name: [{ family: String, given: [String]}],
  gender: String,
  birthDate: String,
  resource: { type: Object, required: true }
}, {
  timestamps: true
})

// const PatientModel = mongoose.models.Patient || mongoose.model('Patient', patientSchema)
const PatientModel = mongoose.model('Patient', PatientSchema)


// export { PatientModel, ConditionModel }

export default PatientModel
