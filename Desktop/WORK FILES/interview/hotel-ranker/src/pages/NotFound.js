import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div>
        <h2>Sorry, page does not exist</h2>
        <Link to="/">Back to the homepage</Link>
    </div>
  )
}

export default NotFound