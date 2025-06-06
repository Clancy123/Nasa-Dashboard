import { useEffect, useState } from 'react'

export default function Apod() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchApod = async () => {
      setLoading(true)
      setError(null)

      try {
        const res = await fetch(
          `https://api.nasa.gov/planetary/apod?api_key=${import.meta.env.VITE_NASA_API_KEY}`
        )
        if (!res.ok) throw new Error('Failed to fetch APOD data')
        const json = await res.json()
        setData(json)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchApod()
  }, [])

  if (loading) return <div className="p-4">Loading...</div>
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{data.title}</h1>
      <p className="mb-4 italic">{data.date}</p>
      {data.media_type === 'video' ? (
        <iframe
          title="apod-video"
          src={data.url}
          frameBorder="0"
          allowFullScreen
          className="w-full h-64 mb-4"
        />
      ) : (
        <img src={data.url} alt={data.title} className="mb-4 rounded" />
      )}
      <p>{data.explanation}</p>
    </div>
  )
}
