import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './web-components/accommodation-form'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
