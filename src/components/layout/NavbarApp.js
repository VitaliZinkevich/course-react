import React from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'

// import 'materialize-css/dist/css/materialize.min.css'
// import M from 'materialize-css'

import {Navbar, NavItem, Icon, SideNav} from 'react-materialize'

import SingIn from '../auth/SingIn'
import SingUp from '../auth/SingUp'

class NavbarApp extends React.Component{
    
    // constructor(props) {
    //     super(props);
    //     document.addEventListener('DOMContentLoaded', function() {
    //         var elems = document.querySelectorAll('.sidenav');
    //         var instances = M.Sidenav.init(elems, {});
    //       });
        
    //   }

render (){
    return (
        
        <Navbar brand='logo' right fixed={true} 
        >
            <NavItem> Components1</NavItem>
            <NavItem href='components.html'>Components</NavItem>
        </Navbar> 
        
                    
    )

}

}



export default NavbarApp