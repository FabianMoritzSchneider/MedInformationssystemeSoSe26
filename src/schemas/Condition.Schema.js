import mongoose from 'mongoose'

// const mongoose = require('mongoose')

const conditionSchema = new mongoose.Schema({
    patientId: {
    type: String, 
    required: true, 
    unique:true, 
    index: true
  }, 
  code: {
    type: Object 
  },
  
  text: String,
    status: String,
    category: [Object],
  resource: { type: Object, required: true }
}, {
  timestamps: true
})


const ConditionModel = mongoose.model('Conditon', conditionSchema)

export default ConditionModel