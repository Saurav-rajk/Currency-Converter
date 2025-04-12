import { useState } from 'react'
import CurrencyConverter from './components/CurrencyConverter'
import './App.css'

function App() {
  return (
    // Outer div with a full-screen background image
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/premium-vector/global-currency-background_115579-405.jpg?semt=ais_hybrid')",
      }}
    >
      {/* Inner div with a solid background color */}
      <div className="w-full max-w-3xl p-6 rounded-lg shadow-lg opacity-79">
        <CurrencyConverter />
      </div>
    </div>
  )
}

export default App
