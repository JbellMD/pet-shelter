import React from 'react'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'

const S3_BUCKET_URL = import.meta.env.VITE_PET_IMAGES_BUCKET_URL;

const Header = ({isUserSignedIn}) => {
  return (
    <div className='header'>
        <div className='header-title'>
            {/* <img id="logo" src={logo} alt="Company Logo" /> */}
            <img id='logo' src={`${S3_BUCKET_URL}/logo.png`} alt="" />
            <h1>AnyCompany Pet Shelter</h1>
        </div>
        <nav className='navigation'>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/pets">Pets</Link></li>
                <li><Link to="/adopt">Adopt</Link></li>
                {
                    isUserSignedIn ?
                        <li><Link to="/applications">Applications</Link></li>
                    : null   
                }

            </ul>
        </nav>
        
    </div>
  )
}

export default Header