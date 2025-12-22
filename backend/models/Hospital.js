const mongoose = require('mongoose')

const HospitalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  hospitalId: { type: String, required: true, unique: true },
  // hashedPassword is used for authentication
  password: { type: String, required: true },
  // initialPassword stores the original password supplied at creation (plaintext).
  // NOTE: Storing plaintext passwords is insecure; this is implemented per user request.
  initialPassword: { type: String },
  // Operational details
  beds: {
    total: { type: Number, default: 0 },
    available: { type: Number, default: 0 }
  },
  medicineStock: { type: Array, default: [] },
  bloodUnits: { type: Object, default: {} },
  ambulances: {
    total: { type: Number, default: 0 },
    available: { type: Number, default: 0 }
  },
  totalDoctors: { type: Number, default: 0 },
  totalPatients: { type: Number, default: 0 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }
}, { timestamps: true })

module.exports = mongoose.model('Hospital', HospitalSchema)
