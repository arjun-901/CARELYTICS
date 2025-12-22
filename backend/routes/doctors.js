const express = require('express')
const router = express.Router()
const Doctor = require('../models/Doctor')
const hospitalAuth = require('../middleware/hospitalAuth')

// POST /api/doctors — create doctor
router.post('/', hospitalAuth, async (req, res) => {
  const { name, specialization, phone, email } = req.body || {}
  if (!name || !specialization) return res.status(400).json({ error: 'Missing required fields' })
  try {
    const doctor = new Doctor({ hospitalId: req.hospital.id, name, specialization, phone, email })
    await doctor.save()
    res.status(201).json(doctor)
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Server error' })
  }
})

// GET /api/doctors — list doctors for hospital
router.get('/', hospitalAuth, async (req, res) => {
  try {
    const list = await Doctor.find({ hospitalId: req.hospital.id }).sort({ createdAt: -1 })
    res.json(list)
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Server error' })
  }
})

// GET /api/doctors/:id — get doctor by id
router.get('/:id', hospitalAuth, async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id)
    if (!doctor || doctor.hospitalId !== req.hospital.id) return res.status(404).json({ error: 'Not found' })
    res.json(doctor)
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Server error' })
  }
})

// PATCH /api/doctors/:id — update doctor
router.patch('/:id', hospitalAuth, async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id)
    if (!doctor || doctor.hospitalId !== req.hospital.id) return res.status(404).json({ error: 'Not found' })
    const updates = {}
    const allowed = ['name', 'specialization', 'phone', 'email', 'available']
    allowed.forEach(key => {
      if (req.body[key] !== undefined) updates[key] = req.body[key]
    })
    Object.assign(doctor, updates)
    await doctor.save()
    res.json(doctor)
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Server error' })
  }
})

// DELETE /api/doctors/:id — delete doctor
router.delete('/:id', hospitalAuth, async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id)
    if (!doctor || doctor.hospitalId !== req.hospital.id) return res.status(404).json({ error: 'Not found' })
    await Doctor.deleteOne({ _id: req.params.id })
    res.json({ ok: true })
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Server error' })
  }
})

module.exports = router
