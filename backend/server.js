require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const adminRoutes = require('./routes/admin')
const hospitalRoutes = require('./routes/hospitals')
const doctorRoutes = require('./routes/doctors')
const patientRoutes = require('./routes/patients')
const userRoutes = require('./routes/users')

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/carelytics'

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB')
}).catch(err => {
  console.error('MongoDB connection error:', err.message)
})

app.use('/api/admin', adminRoutes)
app.use('/api/hospitals', hospitalRoutes)
app.use('/api/doctors', doctorRoutes)
app.use('/api/patients', patientRoutes)
app.use('/api/users', userRoutes)

app.get('/', (req, res) => res.send({ ok: true, message: 'Carelytics backend running' }))

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
