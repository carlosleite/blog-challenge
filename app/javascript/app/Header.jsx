import React from 'react'

function Header () {
  return (
    <header className="blog-header py-3 fixed-top">
      <div className="row flex-nowrap justify-content-between align-items-center">
        <div className="col text-center">
          <a className="blog-header-logo text-dark" href="#">Fancy Blog</a>
        </div>
      </div>
    </header>
  )
}

export default Header
