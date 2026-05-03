import { useState, useCallback } from 'react'
import LandingPage from './components/LandingPage'
import LoadingScreen from './components/LoadingScreen'
import Dashboard from './components/Dashboard'
import QCC from './components/sections/QCC'
import ALCI from './components/sections/ALCI'
import EOM from './components/sections/EOM'
import NQAM from './components/sections/NQAM'
import QTSE from './components/sections/QTSE'
import ChatInterface from './components/ChatInterface'

export default function App() {
  const [page, setPage] = useState('landing')

  const navigate = useCallback((to) => {
    setPage(to)
    window.scrollTo(0, 0)
  }, [])

  const handleEnter = useCallback(() => {
    setPage('loading')
    setTimeout(() => setPage('dashboard'), 3800)
  }, [])

  const map = {
    landing: <LandingPage onEnter={handleEnter} />,
    loading: <LoadingScreen />,
    dashboard: <Dashboard navigate={navigate} />,
    qcc: <QCC navigate={navigate} />,
    alci: <ALCI navigate={navigate} />,
    eom: <EOM navigate={navigate} />,
    nqam: <NQAM navigate={navigate} />,
    qtse: <QTSE navigate={navigate} />,
    chat: <ChatInterface navigate={navigate} />,
  }

  return map[page] || map.landing
}
