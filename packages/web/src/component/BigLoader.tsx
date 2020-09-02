import React from "react"
import logo from "@free/core/img/logo.png"

const BigLoader = () => (
  <div className="applayout">
    <div className="big-container">
      <img className="big-logo" src={logo} height={150} width={150} />
      <div className="big-loader">Loading...</div>
    </div>
  </div>
)

export default BigLoader
