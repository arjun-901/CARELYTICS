const express = require('express')
const router = express.Router()
const Hospital = require('../models/Hospital')
const Doctor = require('../models/Doctor')
const Patient = require('../models/Patient')
const bcrypt = require('bcrypt')
const auth = require('../middleware/auth')
const hospitalAuth = require('../middleware/hospitalAuth')
const jwt = require('jsonwebtoken')

// POST /api/hospitals — requires Authorization: Bearer <token>
// Create hospital (protected by admin)
router.post('/', auth, async (req, res) => {
  const { name, address, hospitalId, password } = req.body || {}
  if (!name || !address || !hospitalId || !password) return res.status(400).json({ error: 'Missing fields' })
  try {
    const exists = await Hospital.findOne({ hospitalId })
    if (exists) return res.status(409).json({ error: 'hospitalId already exists' })
    const hashed = await bcrypt.hash(password, 10)
    // Save both hashed password and the initial plaintext password (see model note)
    const item = new Hospital({ name, address, hospitalId, password: hashed, initialPassword: password, createdBy: req.admin.id })
    await item.save()
    // Return created object including initialPassword so admin can view it
    const out = item.toObject()
    delete out.__v
    res.status(201).json(out)
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Server error' })
  }
})

// GET /api/hospitals — list hospitals (protected by admin)
router.get('/', auth, async (req, res) => {
  try {
    const list = await Hospital.find().select('-__v').sort({ createdAt: -1 })
    // Populate doctors and patients for each hospital
    const hospitalsWithData = await Promise.all(list.map(async (hospital) => {
      const hospitalObj = hospital.toObject()
      const doctors = await Doctor.find({ hospitalId: hospital.hospitalId })
      const patients = await Patient.find({ hospitalId: hospital.hospitalId })
      hospitalObj.doctors = doctors
      hospitalObj.patients = patients
      return hospitalObj
    }))
    res.json(hospitalsWithData)
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Server error' })
  }
})

// POST /api/hospitals/login — hospital login using hospitalId and password
router.post('/login', async (req, res) => {
  const { hospitalId, password } = req.body || {}
  if (!hospitalId || !password) return res.status(400).json({ error: 'Missing hospitalId or password' })
  try {
    const hospital = await Hospital.findOne({ hospitalId })
    if (!hospital) return res.status(401).json({ error: 'Invalid credentials' })
    const ok = await bcrypt.compare(password, hospital.password)
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' })
    // sign token containing hospitalId
    const token = jwt.sign({ hospitalId: hospital.hospitalId, id: hospital._id }, process.env.JWT_SECRET || 'change_this_secret', { expiresIn: '12h' })
    const out = hospital.toObject()
    delete out.password
    delete out.__v
    return res.json({ token, hospital: out })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: 'Server error' })
  }
})

// GET /api/hospitals/me — get the logged-in hospital details (protected by hospital token)
router.get('/me', hospitalAuth, async (req, res) => {
  try {
    const hospital = await Hospital.findOne({ hospitalId: req.hospital.id }).select('-password -__v')
    if (!hospital) return res.status(404).json({ error: 'Not found' })
    const hospitalObj = hospital.toObject()
    const doctors = await Doctor.find({ hospitalId: req.hospital.id })
    const patients = await Patient.find({ hospitalId: req.hospital.id })
    hospitalObj.doctors = doctors
    hospitalObj.patients = patients
    res.json(hospitalObj)
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Server error' })
  }
})

// PATCH /api/hospitals/me — update hospital operational details (protected by hospital token)
router.patch('/me', hospitalAuth, async (req, res) => {
  const updates = {}
  const allowed = ['beds', 'medicineStock', 'bloodUnits', 'ambulances', 'totalDoctors', 'totalPatients']
  allowed.forEach(key => {
    if (req.body[key] !== undefined) updates[key] = req.body[key]
  })
  try {
    const hospital = await Hospital.findOneAndUpdate({ hospitalId: req.hospital.id }, { $set: updates }, { new: true }).select('-password -__v')
    if (!hospital) return res.status(404).json({ error: 'Not found' })
    res.json(hospital)
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Server error' })
  }
})

// DELETE /api/hospitals/:id — delete hospital by ID (protected by admin)
// GET /api/hospitals/:id — get hospital by ID with doctors and patients (protected by admin)
router.get('/:id', auth, async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id).select('-password -__v')
    if (!hospital) return res.status(404).json({ error: 'Hospital not found' })
    const hospitalObj = hospital.toObject()
    const doctors = await Doctor.find({ hospitalId: hospital.hospitalId })
    const patients = await Patient.find({ hospitalId: hospital.hospitalId })
    hospitalObj.doctors = doctors
    hospitalObj.patients = patients
    res.json(hospitalObj)
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Server error' })
  }
})

// DELETE /api/hospitals/:id — delete hospital by ID (protected by admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    const hospital = await Hospital.findByIdAndDelete(req.params.id)
    if (!hospital) return res.status(404).json({ error: 'Hospital not found' })
    res.json({ message: 'Hospital deleted successfully', hospital })
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Server error' })
  }
})

module.exports = router

