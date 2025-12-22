const mongoose = require('mongoose')

const PatientSchema = new mongoose.Schema({
  hospitalId: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: Number },
  gender: { type: String },
  phone: { type: String },
  email: { type: String },
  address: { type: String },
  dateAdmitted: { type: Date, default: Date.now },
  status: { type: String, enum: ['admitted', 'discharged', 'under-treatment'], default: 'admitted' },
  diagnosis: { type: String },
  assignedDoctor: { type: String },
  bedNumber: { type: String }
}, { timestamps: true })

module.exports = mongoose.model('Patient', PatientSchema)
