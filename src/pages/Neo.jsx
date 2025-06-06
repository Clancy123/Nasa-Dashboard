import { useEffect, useState } from 'react'

export default function Neo() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchNeo = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(
          `https://api.nasa.gov/neo/rest/v1/feed/today?api_key=${import.meta.env.VITE_NASA_API_KEY}`
        )
        if (!res.ok) throw new Error('Failed to fetch NEO data')
        const json = await res.json()
        setData(json)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchNeo()
  }, [])

  if (loading) return <div className="p-4">Loading NEO data...</div>
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>

  // Extract near-earth objects for today
  const today = Object.keys(data.near_earth_objects)[0]
  const neos = data.near_earth_objects[today]

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Near-Earth Objects Today ({today})</h1>
      <ul className="space-y-4">
        {neos.map((neo) => (
          <li key={neo.id} className="border p-3 rounded shadow">
            <h2 className="font-semibold">{neo.name}</h2>
            <p>
              Diameter: {neo.estimated_diameter.meters.estimated_diameter_min.toFixed(1)}m -{' '}
              {neo.estimated_diameter.meters.estimated_diameter_max.toFixed(1)}m
            </p>
            <p>
              Potentially Hazardous: {neo.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}
            </p>
            <p>
              Closest Approach:{' '}
              {neo.close_approach_data[0]?.close_approach_date_full || 'N/A'}
            </p>
            <p>
              Miss Distance: {parseFloat(neo.close_approach_data[0]?.miss_distance.kilometers).toFixed(0)} km
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
