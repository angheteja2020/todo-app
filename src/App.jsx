import { useState } from 'react'
import TodoApp from './TodoApp'
import './App.css'

/**
 * App.jsx - Root Application Component
 * 
 * Purpose: This is the main entry point for the React application.
 * It serves as the top-level component that gets mounted to the DOM.
 * 
 * Responsibilities:
 * - Import and render the TodoApp component
 * - Can be used to set up global providers (theme, context, etc.)
 * - Handles top-level application structure
 */

function App() {
  return (
    <div className="App">
      <TodoApp />
    </div>
  )
}

export default App