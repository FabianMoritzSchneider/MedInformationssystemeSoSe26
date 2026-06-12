import mongoose from 'mongoose'

const ConditionSchema = new mongoose.Schema({
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

// const ConditionModel = mongoose.models.Condition || mongoose.model('Condition', conditionSchema)
const ConditionModel = mongoose.model('Condition', ConditionSchema)

// export { PatientModel, ConditionModel }

export default ConditionModel
