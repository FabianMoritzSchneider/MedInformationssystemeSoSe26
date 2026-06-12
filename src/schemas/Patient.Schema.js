import mongoose from 'mongoose'


const patientSchema = new mongoose.Schema({
  patientId: {
    type: String, 
    required: true, 
    unique:true, 
    index: true
  }, 
  familyName: {
    type: String, 
    required:true
  },
  givenName: {
    type: [String]
  },
  gender: {
    type: String
  }
}) 

const Patient = mongoose.model('Patient', patientSchema)

export default Patient