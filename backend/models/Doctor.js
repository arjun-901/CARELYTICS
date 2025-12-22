const mongoose = require('mongoose')

const DoctorSchema = new mongoose.Schema({
  hospitalId: { type: String, required: true },
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  phone: { type: String },
  email: { type: String },
  available: { type: Boolean, default: true }
}, { timestamps: true })

module.exports = mongoose.model('Doctor', DoctorSchema)
