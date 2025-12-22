const express = require('express')
const router = express.Router()
const Admin = require('../models/Admin')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// POST /api/admin/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body || {}
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' })
  try {
    const admin = await Admin.findOne({ email: email.toLowerCase() })
    if (!admin) return res.status(401).json({ error: 'Invalid credentials' })
    const ok = await bcrypt.compare(password, admin.password)
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' })
    const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET || 'change_this_secret', { expiresIn: '8h' })
    return res.json({ email: admin.email, name: admin.name, token })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: 'Server error' })
  }
})

module.exports = router
