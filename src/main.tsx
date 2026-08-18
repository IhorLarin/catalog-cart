// React
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Fonts
import "@fontsource-variable/oswald"
import "@fontsource-variable/inter"
import "@fontsource-variable/geist-mono"

// Styles
import './index.css'

// App
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
