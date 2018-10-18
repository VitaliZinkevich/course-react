import React from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'

// import 'materialize-css/dist/css/materialize.min.css'
// import M from 'materialize-css'

import {Navbar, NavItem, Icon} from 'react-materialize'

import SingIn from '../auth/SingIn'
import SingUp from '../auth/SingUp'

class NavbarApp extends React.Component{
    
render (){
    return (
        
    <Navbar brand='welcomebelarus.ru' right>
      
        <NavItem href='/about'>About</NavItem>
        <NavItem href='/contacts'>Contacts</NavItem>
        
    </Navbar>
        
                    
    )

}

}



export default NavbarApp