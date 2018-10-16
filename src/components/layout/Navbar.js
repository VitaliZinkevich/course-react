import React from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'


import SingIn from '../auth/SingIn'
import SingOut from '../auth/SingOut'

const Navbar = ()=>{

    return (
        <header className='container'>
           <nav>
                <div className="nav-wrapper">
                <NavLink to="/" className="brand-logo">welcomebelarus.ru</NavLink>
                <NavLink to='/' data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></NavLink>
                <ul className="right hide-on-med-and-down">
                    <li><NavLink to="/about">About</NavLink></li>
                    <li><NavLink to="/contacts">Contacts</NavLink></li>
      
                </ul>
                </div>
            </nav>

            <ul className="sidenav" id="mobile-demo">
            <li><NavLink to="/">Main</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/contacts">Contacts</NavLink></li>
            
            <li><NavLink to="mobile.html">Mobile</NavLink></li>
            </ul>
        </header>
                    
    )



}



export default Navbar