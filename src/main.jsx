import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import React from 'react'
import App from './App.jsx'
import ReactDOM from 'react-dom/client'
import './index.css'

/** * 1. document.getElementById('root') finds the empty <div> in index.html.
 * 2. createRoot() prepares that spot to display the React app.
 * 3. .render() pushes the App into that spot.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  /* Displaying the App.jsx content inside the root div */
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)