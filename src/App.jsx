import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import FarmerRegistration from './components/FarmerRegistration'
import ChatAdvisory from './components/ChatAdvisory'
import Notifications from './components/Notifications'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FarmerRegistration />} />
        <Route path="/chat" element={<ChatAdvisory />} />
        <Route path="/notifications" element={<Notifications />} />
      </Routes>
    </Router>
  )
}

export default App
