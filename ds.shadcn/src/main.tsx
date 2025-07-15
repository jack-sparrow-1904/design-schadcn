import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { DesignerProvider } from './contexts/DesignerContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DesignerProvider>
      <App />
    </DesignerProvider>
  </StrictMode>,
)
