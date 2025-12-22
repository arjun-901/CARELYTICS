import React, { useState, useEffect } from 'react'
import { getHospitalDetails } from '../services/api'

const HospitalDashboard = ({ hospital, onLogout }) => {
  const [details, setDetails] = useState(hospital)
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState('overview')

  // Poll for updates every 5 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const fresh = await getHospitalDetails()
        setDetails(fresh)
      } catch (e) {
        console.error('Poll error:', e.message)
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleRefresh = async () => {
    setLoading(true)
    try {
      const fresh = await getHospitalDetails()
      setDetails(fresh)
    } catch (e) {
      alert('Failed to refresh: ' + e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: 20 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, borderBottom: '1px solid #ccc', paddingBottom: 10 }}>
        <div>
          <h2>{details.name}</h2>
          <p style={{ margin: 0, color: '#666' }}>{details.address}</p>
        </div>
        <div>
          <button onClick={handleRefresh} disabled={loading} style={{ marginRight: 10 }}>
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
          <button onClick={onLogout} style={{ background: '#ff6b6b', color: 'white', padding: '8px 16px', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
            Logout
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, borderBottom: '2px solid #eee', paddingBottom: 10 }}>
        {['overview', 'beds', 'medicine', 'blood', 'ambulances', 'doctors', 'patients'].map(page => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            style={{
              padding: '10px 16px',
              background: currentPage === page ? '#007bff' : '#f0f0f0',
              color: currentPage === page ? 'white' : '#000',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer',
              fontWeight: currentPage === page ? 'bold' : 'normal'
            }}
          >
            {page.charAt(0).toUpperCase() + page.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      <div>
        {currentPage === 'overview' && <OverviewPage details={details} />}
        {currentPage === 'beds' && <BedsPage details={details} onUpdate={handleRefresh} />}
        {currentPage === 'medicine' && <MedicinePage details={details} onUpdate={handleRefresh} />}
        {currentPage === 'blood' && <BloodPage details={details} onUpdate={handleRefresh} />}
        {currentPage === 'ambulances' && <AmbulancesPage details={details} onUpdate={handleRefresh} />}
        {currentPage === 'doctors' && <DoctorsPage details={details} onUpdate={handleRefresh} />}
        {currentPage === 'patients' && <PatientsPage details={details} onUpdate={handleRefresh} />}
      </div>
    </div>
  )
}

const OverviewPage = ({ details }) => (
  <div>
    <h3>Hospital Overview</h3>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
      <StatCard title="Total Beds" value={details.beds?.total || 0} />
      <StatCard title="Available Beds" value={details.beds?.available || 0} />
      <StatCard title="Total Ambulances" value={details.ambulances?.total || 0} />
      <StatCard title="Available Ambulances" value={details.ambulances?.available || 0} />
      <StatCard title="Total Doctors" value={details.totalDoctors || 0} />
      <StatCard title="Total Patients" value={details.totalPatients || 0} />
    </div>
    <div style={{ marginTop: 20 }}>
      <h4>Blood Units in Stock</h4>
      <p>{JSON.stringify(details.bloodUnits || {}, null, 2)}</p>
    </div>
    <div style={{ marginTop: 20 }}>
      <h4>Medicine Stock Count</h4>
      <p>{details.medicineStock?.length || 0} medicines registered</p>
    </div>
  </div>
)

const StatCard = ({ title, value }) => (
  <div style={{ padding: 16, background: '#f9f9f9', border: '1px solid #ddd', borderRadius: 8 }}>
    <h4 style={{ margin: '0 0 10px 0' }}>{title}</h4>
    <p style={{ margin: 0, fontSize: 24, fontWeight: 'bold', color: '#007bff' }}>{value}</p>
  </div>
)

const BedsPage = ({ details, onUpdate }) => {
  const [total, setTotal] = useState(details.beds?.total || 0)
  const [available, setAvailable] = useState(details.beds?.available || 0)

  const handleSave = async () => {
    try {
      const { updateHospitalDetails } = await import('../services/api')
      await updateHospitalDetails({ beds: { total: parseInt(total), available: parseInt(available) } })
      onUpdate()
      alert('Beds updated successfully')
    } catch (e) {
      alert('Failed to update: ' + e.message)
    }
  }

  return (
    <div>
      <h3>Manage Beds</h3>
      <form style={{ display: 'grid', gap: 12, maxWidth: 400 }}>
        <div>
          <label>Total Beds</label>
          <input type="number" value={total} onChange={e => setTotal(e.target.value)} style={{ width: '100%', padding: 8, boxSizing: 'border-box' }} />
        </div>
        <div>
          <label>Available Beds</label>
          <input type="number" value={available} onChange={e => setAvailable(e.target.value)} style={{ width: '100%', padding: 8, boxSizing: 'border-box' }} />
        </div>
        <button type="button" onClick={handleSave} style={{ padding: 10, cursor: 'pointer' }}>
          Save
        </button>
      </form>
    </div>
  )
}

const MedicinePage = ({ details, onUpdate }) => {
  const [medicines, setMedicines] = useState(details.medicineStock || [])
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState('')

  const handleAdd = async () => {
    if (!name || !quantity) {
      alert('Please fill all fields')
      return
    }
    const updated = [...medicines, { name, quantity: parseInt(quantity) }]
    setMedicines(updated)
    try {
      const { updateHospitalDetails } = await import('../services/api')
      await updateHospitalDetails({ medicineStock: updated })
      onUpdate()
      setName('')
      setQuantity('')
      alert('Medicine added successfully')
    } catch (e) {
      alert('Failed to add: ' + e.message)
    }
  }

  return (
    <div>
      <h3>Medicine Stock</h3>
      <div style={{ display: 'grid', gap: 12, maxWidth: 400, marginBottom: 20 }}>
        <div>
          <label>Medicine Name</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', padding: 8, boxSizing: 'border-box' }} />
        </div>
        <div>
          <label>Quantity</label>
          <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} style={{ width: '100%', padding: 8, boxSizing: 'border-box' }} />
        </div>
        <button type="button" onClick={handleAdd} style={{ padding: 10, cursor: 'pointer' }}>
          Add Medicine
        </button>
      </div>
      <h4>Current Stock</h4>
      {medicines.length === 0 ? <p>No medicines registered</p> : (
        <ul>
          {medicines.map((med, idx) => <li key={idx}>{med.name} — {med.quantity} units</li>)}
        </ul>
      )}
    </div>
  )
}

const BloodPage = ({ details, onUpdate }) => {
  const [bloodUnits, setBloodUnits] = useState(details.bloodUnits || {})
  const [type, setType] = useState('O+')
  const [units, setUnits] = useState('')

  const handleAdd = async () => {
    if (!units) {
      alert('Please enter units')
      return
    }
    const updated = { ...bloodUnits, [type]: (bloodUnits[type] || 0) + parseInt(units) }
    setBloodUnits(updated)
    try {
      const { updateHospitalDetails } = await import('../services/api')
      await updateHospitalDetails({ bloodUnits: updated })
      onUpdate()
      setUnits('')
      alert('Blood units updated successfully')
    } catch (e) {
      alert('Failed to update: ' + e.message)
    }
  }

  return (
    <div>
      <h3>Blood Bank</h3>
      <div style={{ display: 'grid', gap: 12, maxWidth: 400, marginBottom: 20 }}>
        <div>
          <label>Blood Type</label>
          <select value={type} onChange={e => setType(e.target.value)} style={{ width: '100%', padding: 8, boxSizing: 'border-box' }}>
            {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label>Units to Add</label>
          <input type="number" value={units} onChange={e => setUnits(e.target.value)} style={{ width: '100%', padding: 8, boxSizing: 'border-box' }} />
        </div>
        <button type="button" onClick={handleAdd} style={{ padding: 10, cursor: 'pointer' }}>
          Update Stock
        </button>
      </div>
      <h4>Current Blood Units</h4>
      {Object.keys(bloodUnits).length === 0 ? <p>No blood units registered</p> : (
        <ul>
          {Object.entries(bloodUnits).map(([t, u]) => <li key={t}>{t}: {u} units</li>)}
        </ul>
      )}
    </div>
  )
}

const AmbulancesPage = ({ details, onUpdate }) => {
  const [total, setTotal] = useState(details.ambulances?.total || 0)
  const [available, setAvailable] = useState(details.ambulances?.available || 0)

  const handleSave = async () => {
    try {
      const { updateHospitalDetails } = await import('../services/api')
      await updateHospitalDetails({ ambulances: { total: parseInt(total), available: parseInt(available) } })
      onUpdate()
      alert('Ambulances updated successfully')
    } catch (e) {
      alert('Failed to update: ' + e.message)
    }
  }

  return (
    <div>
      <h3>Manage Ambulances</h3>
      <form style={{ display: 'grid', gap: 12, maxWidth: 400 }}>
        <div>
          <label>Total Ambulances</label>
          <input type="number" value={total} onChange={e => setTotal(e.target.value)} style={{ width: '100%', padding: 8, boxSizing: 'border-box' }} />
        </div>
        <div>
          <label>Available Ambulances</label>
          <input type="number" value={available} onChange={e => setAvailable(e.target.value)} style={{ width: '100%', padding: 8, boxSizing: 'border-box' }} />
        </div>
        <button type="button" onClick={handleSave} style={{ padding: 10, cursor: 'pointer' }}>
          Save
        </button>
      </form>
    </div>
  )
}

const DoctorsPage = ({ details, onUpdate }) => {
  const [totalDoctors, setTotalDoctors] = useState(details.totalDoctors || 0)

  const handleSave = async () => {
    try {
      const { updateHospitalDetails } = await import('../services/api')
      await updateHospitalDetails({ totalDoctors: parseInt(totalDoctors) })
      onUpdate()
      alert('Doctor count updated successfully')
    } catch (e) {
      alert('Failed to update: ' + e.message)
    }
  }

  return (
    <div>
      <h3>Manage Doctors</h3>
      <form style={{ display: 'grid', gap: 12, maxWidth: 400 }}>
        <div>
          <label>Total Doctors</label>
          <input type="number" value={totalDoctors} onChange={e => setTotalDoctors(e.target.value)} style={{ width: '100%', padding: 8, boxSizing: 'border-box' }} />
        </div>
        <button type="button" onClick={handleSave} style={{ padding: 10, cursor: 'pointer' }}>
          Save
        </button>
      </form>
      <div style={{ marginTop: 20 }}>
        <h4>Current Doctor Count</h4>
        <p style={{ fontSize: 24, fontWeight: 'bold', color: '#007bff' }}>{totalDoctors} doctors</p>
      </div>
    </div>
  )
}

const PatientsPage = ({ details, onUpdate }) => {
  const [totalPatients, setTotalPatients] = useState(details.totalPatients || 0)

  const handleSave = async () => {
    try {
      const { updateHospitalDetails } = await import('../services/api')
      await updateHospitalDetails({ totalPatients: parseInt(totalPatients) })
      onUpdate()
      alert('Patient count updated successfully')
    } catch (e) {
      alert('Failed to update: ' + e.message)
    }
  }

  return (
    <div>
      <h3>Manage Patients</h3>
      <form style={{ display: 'grid', gap: 12, maxWidth: 400 }}>
        <div>
          <label>Total Patients</label>
          <input type="number" value={totalPatients} onChange={e => setTotalPatients(e.target.value)} style={{ width: '100%', padding: 8, boxSizing: 'border-box' }} />
        </div>
        <button type="button" onClick={handleSave} style={{ padding: 10, cursor: 'pointer' }}>
          Save
        </button>
      </form>
      <div style={{ marginTop: 20 }}>
        <h4>Current Patient Count</h4>
        <p style={{ fontSize: 24, fontWeight: 'bold', color: '#007bff' }}>{totalPatients} patients</p>
      </div>
    </div>
  )
}

export default HospitalDashboard
