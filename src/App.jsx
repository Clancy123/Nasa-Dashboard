import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Apod from './pages/Apod'
import Neo from './pages/Neo'
import Iss from './pages/Iss'
import Earth from './pages/Earth'
import SolarSystem from './pages/SolarSystem'

export default function App() {
  return (
    <Router>
      <nav className="p-4 bg-gray-800 text-white flex gap-6">
        <Link to="/">APOD</Link>
        <Link to="/neo">NEO</Link>
        <Link to="/iss">ISS</Link>
        <Link to="/earth">Earth</Link>
        <Link to="/solar">Solar System</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Apod />} />
        <Route path="/neo" element={<Neo />} />
        <Route path="/iss" element={<Iss />} />
        <Route path="/earth" element={<Earth />} />
        <Route path="/solar" element={<SolarSystem />} />
      </Routes>
    </Router>
  )
}
