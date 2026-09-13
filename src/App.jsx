import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home'
import BlogAttention from './pages/BlogUncertainty'
import BlogMamba from './pages/BlogMamba'
import BlogVlog from './pages/BlogVlog'
import Verses from './pages/Verses'
import Gallery from './pages/Gallery'
import Reading from './pages/Reading'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/uncertainty in classification" element={<BlogUncertainty />} />
        <Route path="/blog/mamba-state-space-models" element={<BlogMamba />} />
        <Route path="/blog/ai-research-vlog" element={<BlogVlog />} />
        <Route path="/verses" element={<Verses />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/reading" element={<Reading />} />
      </Routes>
    </BrowserRouter>
  )
}
