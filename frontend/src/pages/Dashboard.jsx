import React, { useEffect, useState } from "react";
import { fetchHospitals, socket } from "../services/api";

// Simple homepage replacement for the existing dashboard.
// - Big hero hospital image
// - Search + list of hospitals
// - Real-time updates using socket (expects 'hospitalUpdate' events)
// Replace API endpoints / services/api helpers as needed.

function Dashboard() {
  const [hospitals, setHospitals] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        // Expect fetchHospitals to return { data: [...] }
        // If you don't have fetchHospitals helper, replace with fetch('/api/hospitals')...
        const res = await fetchHospitals();
        if (!mounted) return;
        setHospitals(Array.isArray(res?.data) ? res.data : res);
      } catch (e) {
        console.error(e);
        if (!mounted) return;
        setError("Failed to load hospitals");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();

    // Realtime
    try {
      socket.connect();
      // The socket should emit 'hospitalUpdate' with a single updated hospital object
      socket.on("hospitalUpdate", (updated) => {
        setHospitals((prev) => {
          // merge updated hospital by id (or push if new)
          const idx = prev.findIndex((h) => h.id === updated.id);
          if (idx === -1) return [updated, ...prev];
          const copy = [...prev];
          copy[idx] = { ...copy[idx], ...updated };
          return copy;
        });
      });
    } catch (e) {
      // socket may not be available — ignore gracefully
      console.warn("Socket not available or failed to connect", e);
    }

    return () => {
      mounted = false;
      try {
        socket.off("hospitalUpdate");
        socket.disconnect();
      } catch (e) {
        // ignore
      }
    };
  }, []);

  const filtered = hospitals.filter((h) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      (h.name || "").toLowerCase().includes(q) ||
      (h.city || "").toLowerCase().includes(q) ||
      (h.id || "").toString().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero */}
      <div className="relative h-72 md:h-[28rem] w-full overflow-hidden shadow-lg">
        <img
          src="https://images.adsttc.com/media/images/5d5f/db50/284d/d136/0b00/013c/large_jpg/1411003_000_N124.jpg?1566563137"
          alt="Hospital"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 via-blue-800/50 to-slate-900/70" />
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="max-w-3xl text-center text-white">
            <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg mb-2">Hospital Network</h1>
            <p className="mt-3 text-base md:text-lg opacity-95 font-medium drop-shadow">
              Search hospitals and view live availability (beds, medicine, blood units, ambulances).
            </p>
            <div className="mt-6 flex justify-center">
              <input
                aria-label="Search hospitals"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="🔍 Search by name, city or id..."
                className="w-full md:w-96 px-5 py-3 rounded-full bg-white text-slate-800 placeholder-slate-400 shadow-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white shadow-2xl rounded-2xl p-6 md:p-8 border border-slate-100">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8 pb-6 border-b border-slate-200">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-1">Hospitals ({filtered.length})</h2>
              <p className="text-sm text-green-600 font-semibold flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Realtime updates enabled
              </p>
            </div>
          </div>

          {loading ? (
            <div className="py-12 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-slate-600 font-medium">Loading hospitals...</p>
            </div>
          ) : error ? (
            <div className="py-8 px-6 text-center bg-red-50 rounded-lg border border-red-200">
              <p className="text-red-700 font-semibold">⚠️ {error}</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-slate-600 font-medium">No hospitals found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((h) => (
                <article key={h.id} className="group bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-xl p-5 hover:shadow-xl hover:border-blue-300 transition-all duration-300 cursor-pointer">
                  <div className="flex flex-col gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition">{h.name}</h3>
                      <p className="text-sm text-slate-500 mt-1">📍 {h.city || h.address}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                        <dt className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Beds</dt>
                        <dd className="text-xl font-bold text-blue-700 mt-1">{h.beds?.available ?? h.bedsAvailable ?? "—"}</dd>
                      </div>
                      <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
                        <dt className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Medicine</dt>
                        <dd className="text-xl font-bold text-purple-700 mt-1">{h.medicineStock?.length ?? 0}</dd>
                      </div>
                      <div className="bg-red-50 p-3 rounded-lg border border-red-100">
                        <dt className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Blood Units</dt>
                        <dd className="text-xl font-bold text-red-700 mt-1">{Object.values(h.bloodUnits || {}).reduce((a, b) => a + b, 0) || "—"}</dd>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                        <dt className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Ambulances</dt>
                        <dd className="text-xl font-bold text-green-700 mt-1">{h.ambulances?.available ?? "—"}</dd>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                      <span>Updated: {h.lastUpdated ? new Date(h.lastUpdated).toLocaleTimeString() : '—'}</span>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">{h.status ?? 'Active'}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
export default Dashboard;