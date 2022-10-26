import React from 'react'
import {Link} from "react-router-dom"
import {FaLinkedinIn, FaGithub} from 'react-icons/fa'

function Navbar() {
  return (
    <nav className="header-style h-14 bg-gray-400 sticky top-0">
        <div className="ml-6">
          <Link to="/">
            <h1 className='font-medium'>Hotel<span className="text-blue-600 font-semibold">Ranking</span></h1>
          </Link>
        </div>

        <div className="flex flex-row justify-center items-center gap-2">
            <Link to="/" className="navbarBtn" >Home</Link>
            <Link to="/hotel/create" className="navbarBtn" >Add Hotel</Link>
            <Link to="/hotel/map" className="navbarBtn" >View Map</Link>
        </div>
        <div className="flex flex-row justify-center align-center mr-6 gap-3 ">
            <a rel="noreferrer" href="https://www.linkedin.com/in/raphael-enweazu-373293166" ><FaLinkedinIn size={28} /></a>
            <a rel="noreferrer" href="https://www.github.com/AzedRaphael" ><FaGithub size={28} /></a>
        </div>
    </nav>
  )
}

export default Navbar