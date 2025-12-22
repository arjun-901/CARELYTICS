const jwt = require('jsonwebtoken')
const Hospital = require('../models/Hospital')

async function hospitalAuth(req, res, next) {
  const auth = req.headers.authorization || ''
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null
  if (!token) return res.status(401).json({ error: 'Missing token' })
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET || 'change_this_secret')
    if (!data || !data.hospitalId) return res.status(401).json({ error: 'Invalid token' })
    // attach hospital id
    req.hospital = { id: data.hospitalId }
    next()
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}

module.exports = hospitalAuth
