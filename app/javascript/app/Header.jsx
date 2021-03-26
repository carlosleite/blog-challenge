import React from 'react'
import { Link } from "react-router-dom";

function Header () {
  return (
    <header className="blog-header py-3 fixed-top">
      <div className="row flex-nowrap justify-content-between align-items-center">
        <div className="col text-center">
          <Link to="/" className="blog-header-logo text-dark">Fancy Blog</Link>
        </div>
      </div>
    </header>
  )
}

export default Header
