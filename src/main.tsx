import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './root.css'
import Providers from './context/Providers.js'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <App/>
    </Providers>
  </StrictMode>,
)
