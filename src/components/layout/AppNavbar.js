import React from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'

import {Navbar,NavItem} from 'react-materialize'


import SingIn from '../auth/SingIn'
import SingUp from '../auth/SingUp'

class NavbarApp extends React.Component{
    
render (){
    return (
        
    <Navbar brand={<Link to ='/'>booking app</Link>} right>
        
        <NavItem onClick={console.log ()}><NavLink className='black-text' to='/'>Поиск</NavLink></NavItem>
        <NavItem><NavLink className='black-text' to='/about'> О компании</NavLink></NavItem>
        <NavItem><NavLink className='black-text' to='/contacts'>Контакты </NavLink></NavItem>
        
    </Navbar>
        
                    
    )

}

}



export default withRouter (NavbarApp)