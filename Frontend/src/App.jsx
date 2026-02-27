import React from 'react'
import './styles/theme.css'
import AppRoutes from './assets/routes/AppRoutes'
import axios from 'axios'
import { AuthProvider } from './context/AuthContext'

// include cookies on every request by default
axios.defaults.withCredentials = true

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App
