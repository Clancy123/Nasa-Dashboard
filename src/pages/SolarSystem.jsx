import { useState } from 'react'

// Sample data for planets (you can expand as needed)
const planets = [
  {
    name: 'Mercury',
    description: 'Mercury is the smallest planet and closest to the Sun.',
    diameterKm: 4879,
    gravity: '3.7 m/s²',
    moons: 0,
  },
  {
    name: 'Venus',
    description: 'Venus is the hottest planet and has a thick atmosphere.',
    diameterKm: 12104,
    gravity: '8.87 m/s²',
    moons: 0,
  },
  {
    name: 'Earth',
    description: 'Earth is our home planet and the only one known to support life.',
    diameterKm: 12742,
    gravity: '9.807 m/s²',
    moons: 1,
  },
  {
    name: 'Mars',
    description: 'Mars is known as the Red Planet.',
    diameterKm: 6779,
    gravity: '3.721 m/s²',
    moons: 2,
  },
  {
    name: 'Jupiter',
    description: 'Jupiter is the largest planet and a gas giant.',
    diameterKm: 139822,
    gravity: '24.79 m/s²',
    moons: 79,
  },
  {
    name: 'Saturn',
    description: 'Saturn is famous for its stunning ring system.',
    diameterKm: 116464,
    gravity: '10.44 m/s²',
    moons: 82,
  },
  {
    name: 'Uranus',
    description: 'Uranus is an ice giant with a unique sideways rotation.',
    diameterKm: 50724,
    gravity: '8.87 m/s²',
    moons: 27,
  },
  {
    name: 'Neptune',
    description: 'Neptune is the farthest known planet in our solar system.',
    diameterKm: 49244,
    gravity: '11.15 m/s²',
    moons: 14,
  },
]


export default function SolarSystem() {
  const [selected, setSelected] = useState(planets[0])

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Solar System Planets</h1>
      <div className="flex gap-4">
        <ul className="w-1/3 border rounded p-2 space-y-2">
          {planets.map((planet) => (
            <li
              key={planet.name}
              onClick={() => setSelected(planet)}
              className={`cursor-pointer p-2 rounded ${
                selected.name === planet.name ? 'bg-blue-600 text-white' : 'hover:bg-blue-100'
              }`}
            >
              {planet.name}
            </li>
          ))}
        </ul>
        <div className="w-2/3 border rounded p-4">
          <h2 className="text-xl font-semibold mb-2">{selected.name}</h2>
          <p className="mb-2">{selected.description}</p>
          <p>Diameter: {selected.diameterKm.toLocaleString()} km</p>
          <p>Gravity: {selected.gravity}</p>
          <p>Number of moons: {selected.moons}</p>
        </div>
      </div>
    </div>
  )
}
