import { useState } from 'react'

export default function Earth() {
  const [lat, setLat] = useState('29.78') // Default: Houston, TX
  const [lon, setLon] = useState('-95.33')
  const [date, setDate] = useState('2023-06-01')
  const [imageUrl, setImageUrl] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

 const fetchImage = async () => {
  setLoading(true)
  setError(null)
  setImageUrl(null)
  try {
    const res = await fetch(
      `https://api.nasa.gov/planetary/earth/imagery?lon=${lon}&lat=${lat}&date=${date}&cloud_score=true&api_key=${import.meta.env.VITE_NASA_API_KEY}`
    )
    if (!res.ok) {
      // Try to read error message as text (not JSON)
      const text = await res.text()
      throw new Error(`Error fetching image: ${text}`)
    }

    // The API returns a JSON with image URL sometimes, but often returns the image itself!
    // So check content-type:
    const contentType = res.headers.get('content-type')

    if (contentType && contentType.includes('application/json')) {
      const json = await res.json()
      setImageUrl(json.url)
    } else if (contentType && contentType.startsWith('image/')) {
      // If it’s an image, create a blob URL to display
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      setImageUrl(url)
    } else {
      throw new Error('Unexpected response type')
    }
  } catch (err) {
    setError(err.message)
  } finally {
    setLoading(false)
  }
}

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Earth Imagery</h1>

      <div className="mb-4 space-y-2">
        <label>
          Latitude:
          <input
            type="number"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            className="border p-1 ml-2 w-32"
            step="0.01"
          />
        </label>
        <label>
          Longitude:
          <input
            type="number"
            value={lon}
            onChange={(e) => setLon(e.target.value)}
            className="border p-1 ml-2 w-32"
            step="0.01"
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-1 ml-2"
            max={new Date().toISOString().split('T')[0]}
          />
        </label>
      </div>

      <button
        onClick={fetchImage}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Loading...' : 'Fetch Image'}
      </button>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {imageUrl && (
        <div className="mt-6">
          <img src={imageUrl} alt="Earth" className="rounded shadow-lg" />
        </div>
      )}
    </div>
  )
}
