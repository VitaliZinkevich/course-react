import React from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'

// import 'materialize-css/dist/css/materialize.min.css'
// import M from 'materialize-css'

import {Navbar,NavItem, Icon} from 'react-materialize'


import SingIn from '../auth/SingIn'
import SingUp from '../auth/SingUp'

class NavbarApp extends React.Component{
    
render (){
    return (
        
    <Navbar brand={<Link to ='/'>welcomebelarus.ru</Link>} right>
        
        <NavItem onClick={console.log ()}><NavLink className='black-text' to='/'>Home</NavLink></NavItem>
        <NavItem><NavLink className='black-text' to='/about'> About</NavLink></NavItem>
        <NavItem><NavLink className='black-text' to='/contacts'>Contacts </NavLink></NavItem>
        
    </Navbar>
        
                    
    )

}

}



export default withRouter (NavbarApp)