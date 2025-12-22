const express = require('express')
const router = express.Router()
const Patient = require('../models/Patient')
const hospitalAuth = require('../middleware/hospitalAuth')

// POST /api/patients — create patient
router.post('/', hospitalAuth, async (req, res) => {
  const { name, age, gender, phone, email, address, diagnosis, assignedDoctor, bedNumber } = req.body || {}
  if (!name) return res.status(400).json({ error: 'Missing name' })
  try {
    const patient = new Patient({
      hospitalId: req.hospital.id,
      name,
      age,
      gender,
      phone,
      email,
      address,
      diagnosis,
      assignedDoctor,
      bedNumber
    })
    await patient.save()
    res.status(201).json(patient)
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Server error' })
  }
})

// GET /api/patients — list patients for hospital
router.get('/', hospitalAuth, async (req, res) => {
  try {
    const list = await Patient.find({ hospitalId: req.hospital.id }).sort({ createdAt: -1 })
    res.json(list)
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Server error' })
  }
})

// GET /api/patients/:id — get patient by id
router.get('/:id', hospitalAuth, async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id)
    if (!patient || patient.hospitalId !== req.hospital.id) return res.status(404).json({ error: 'Not found' })
    res.json(patient)
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Server error' })
  }
})

// PATCH /api/patients/:id — update patient
router.patch('/:id', hospitalAuth, async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id)
    if (!patient || patient.hospitalId !== req.hospital.id) return res.status(404).json({ error: 'Not found' })
    const updates = {}
    const allowed = ['name', 'age', 'gender', 'phone', 'email', 'address', 'diagnosis', 'assignedDoctor', 'bedNumber', 'status']
    allowed.forEach(key => {
      if (req.body[key] !== undefined) updates[key] = req.body[key]
    })
    Object.assign(patient, updates)
    await patient.save()
    res.json(patient)
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Server error' })
  }
})

// DELETE /api/patients/:id — delete patient
router.delete('/:id', hospitalAuth, async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id)
    if (!patient || patient.hospitalId !== req.hospital.id) return res.status(404).json({ error: 'Not found' })
    await Patient.deleteOne({ _id: req.params.id })
    res.json({ ok: true })
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Server error' })
  }
})

module.exports = router
