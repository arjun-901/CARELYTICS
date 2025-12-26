require('dotenv').config()
const mongoose = require('mongoose')
const Admin = require('./models/Admin')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/carelytics'

async function run() {
  await mongoose.connect(MONGODB_URI)
  console.log('Connected to MongoDB for seeding')

  const email = process.env.SEED_ADMIN_EMAIL || 'admin@care.com'
  const password = process.env.SEED_ADMIN_PASSWORD || 'admin123'
  const name = process.env.SEED_ADMIN_NAME || 'Admin'

  let admin = await Admin.findOne({ email })
  if (admin) {
    console.log('Admin already exists:', email)
  } else {
    const hashed = await bcrypt.hash(password, 10)
    admin = new Admin({ email, password: hashed, name })
    await admin.save()
    console.log('Created admin:', email)
  }

  const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET || 'change_this_secret', { expiresIn: '8h' })
  console.log('\nAdmin login token (store securely):\n')
  console.log(token)
  console.log('\nUse this token as: Authorization: Bearer <token>')

  process.exit(0)
}

run().catch(err => {
  console.error(err)
  process.exit(1)
})
