import { useEffect, useRef } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Home from './pages/Home'
import Admin from './pages/Admin'
import Navbar from './components/Navbar'

function Cursor() {
  const cursorRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const move = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px'
        cursorRef.current.style.top = e.clientY + 'px'
      }
      if (ringRef.current) {
        setTimeout(() => {
          ringRef.current.style.left = e.clientX + 'px'
          ringRef.current.style.top = e.clientY + 'px'
        }, 60)
      }
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <>
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-ring" ref={ringRef} />
    </>
  )
}

export default function App() {
  return (
    <>
      <Cursor />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#0D1120',
            color: '#EDE9E0',
            border: '1px solid #1A2040',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '13px',
          }
        }}
      />
      <Routes>
        <Route path="/" element={<><Navbar /><Home /></>} />
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    </>
  )
}
