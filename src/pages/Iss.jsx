import { useEffect, useState } from 'react'

export default function Iss() {
  const [position, setPosition] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchIssPosition = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch('http://api.open-notify.org/iss-now.json')
        if (!res.ok) throw new Error('Failed to fetch ISS position')
        const data = await res.json()
        setPosition(data.iss_position)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchIssPosition()

    // Optional: Refresh ISS position every 5 seconds
    const interval = setInterval(fetchIssPosition, 5000)
    return () => clearInterval(interval)
  }, [])

  if (loading) return <div className="p-4">Loading ISS position...</div>
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>

  return (
    <div className="p-4 text-center max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">International Space Station (ISS) Current Location</h1>
      <p>Latitude: {position.latitude}</p>
      <p>Longitude: {position.longitude}</p>
      <div className="mt-4">
        <iframe
          title="ISS Location Map"
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${position.longitude - 1}%2C${position.latitude - 1}%2C${parseFloat(position.longitude) + 1}%2C${parseFloat(position.latitude) + 1}&layer=mapnik&marker=${position.latitude}%2C${position.longitude}`}
          style={{ width: '100%', height: '400px', border: '1px solid black' }}
          loading="lazy"
        ></iframe>
      </div>
    </div>
  )
}
