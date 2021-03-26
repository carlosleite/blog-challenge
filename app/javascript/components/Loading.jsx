import React from 'react'

function Loading () {
  return (
    <div className="loading-indicator text-center">
      <div className="spinner-grow text-secondary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}

export default Loading
