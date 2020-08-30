import React from "react"
import logo from "@free/core/img/logo.png"

const BigLoader = () => (
  <div className="applayout">
    <div className="pre-container">
      <img className="pre-logo" src={logo} height={150} width={150} />
      <div className="pre-loader">Loading...</div>
    </div>
  </div>
)

export default BigLoader
