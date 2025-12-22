import React, { useState, useEffect } from 'react'
import { createHospital, getHospitals, deleteHospital } from '../services/api'

const AddHospital = ({ admin }) => {
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [hospitalId, setHospitalId] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [hospitals, setHospitals] = useState([])
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(null)

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('hospitals') || '[]')
      setHospitals(saved)
    } catch (e) { }
  }, [])

  useEffect(() => {
    async function load() {
      try {
        const list = await getHospitals()
        if (Array.isArray(list) && list.length) {
          setHospitals(list)
          localStorage.setItem('hospitals', JSON.stringify(list))
        }
      } catch (e) {
        console.error('Failed to load hospitals:', e)
      }
    }
    load()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage(null)
    setLoading(true)
    const payload = { name, address, hospitalId, password }
    try {
      const res = await createHospital(payload)
      setMessage({ type: 'success', text: '✓ Hospital saved successfully' })
      const updated = [res, ...hospitals]
      setHospitals(updated)
      localStorage.setItem('hospitals', JSON.stringify(updated))
      setName('')
      setAddress('')
      setHospitalId('')
      setPassword('')
      setTimeout(() => setMessage(null), 3000)
    } catch (err) {
      setMessage({ type: 'error', text: '✗ ' + (err.message || 'Failed to save hospital') })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (hospitalId, hospitalName) => {
    if (!window.confirm(`Are you sure you want to delete "${hospitalName}"? This action cannot be undone.`)) {
      return
    }
    
    setDeleting(hospitalId)
    try {
      await deleteHospital(hospitalId)
      setHospitals(hospitals.filter(h => h._id !== hospitalId && h.hospitalId !== hospitalId))
      localStorage.setItem('hospitals', JSON.stringify(hospitals.filter(h => h._id !== hospitalId)))
      setMessage({ type: 'success', text: `✓ "${hospitalName}" deleted successfully` })
      setTimeout(() => setMessage(null), 3000)
    } catch (err) {
      setMessage({ type: 'error', text: '✗ Failed to delete hospital: ' + (err.message || 'Unknown error') })
    } finally {
      setDeleting(null)
    }
  }

  return (
    <div className="space-y-8">
      {/* Add Hospital Form */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          <span>➕</span> Add New Hospital
        </h2>
        <p className="text-gray-600 text-sm mb-6">Create a new hospital account in the system</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Hospital Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="e.g., City Medical Center"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Hospital ID</label>
              <input
                type="text"
                value={hospitalId}
                onChange={(e) => setHospitalId(e.target.value)}
                required
                placeholder="e.g., HOSP_001"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                placeholder="e.g., 123 Main Street, City, State"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Default Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
          </div>

          {message && (
            <div className={`rounded-lg p-4 flex items-center gap-2 ${
              message.type === 'success'
                ? 'bg-green-50 border border-green-200 text-green-700'
                : 'bg-red-50 border border-red-200 text-red-700'
            }`}>
              <span>{message.type === 'success' ? '✓' : '✗'}</span>
              <p className="font-semibold text-sm">{message.text}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="inline-block animate-spin">⏳</span>
                Saving...
              </>
            ) : (
              <>
                <span>💾</span>
                Save Hospital
              </>
            )}
          </button>
        </form>
      </div>

      {/* Hospitals List */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          <span>🏥</span> Hospitals List
        </h2>
        <p className="text-gray-600 text-sm mb-6">Manage all registered hospitals ({hospitals.length})</p>

        {hospitals.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-2">No hospitals registered yet</p>
            <p className="text-gray-400 text-sm">Add a hospital using the form above to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {hospitals.map((h) => (
              <div
                key={h._id || h.hospitalId}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800 break-words">{h.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">📍 {h.address}</p>
                  </div>
                  <span className="ml-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold whitespace-nowrap">
                    {h.hospitalId}
                  </span>
                </div>

                <div className="space-y-2 mb-4 pb-4 border-b border-blue-200">
                  {h.totalDoctors !== undefined && (
                    <div className="text-sm text-gray-700 flex justify-between">
                      <span>👨‍⚕️ Doctors:</span>
                      <strong>{h.totalDoctors}</strong>
                    </div>
                  )}
                  {h.totalPatients !== undefined && (
                    <div className="text-sm text-gray-700 flex justify-between">
                      <span>👥 Patients:</span>
                      <strong>{h.totalPatients}</strong>
                    </div>
                  )}
                  {h.beds && (
                    <div className="text-sm text-gray-700 flex justify-between">
                      <span>🛏️ Beds:</span>
                      <strong>{h.beds.available || 0} / {h.beds.total || 0}</strong>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleDelete(h._id || h.hospitalId, h.name)}
                  disabled={deleting === h._id || deleting === h.hospitalId}
                  className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-2 px-3 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                >
                  {deleting === h._id || deleting === h.hospitalId ? (
                    <>
                      <span className="inline-block animate-spin">⏳</span>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <span>🗑️</span>
                      Delete Hospital
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AddHospital
