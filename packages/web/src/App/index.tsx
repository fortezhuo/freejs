import React from "react"
import { Link } from "react-router-dom"
import { Screen } from "./screen"

const App = () => {
  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/view">View</Link>
      <Screen />
    </>
  )
}

export default App
