import React from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'

import {Navbar,NavItem, Icon} from 'react-materialize'
import {connect} from 'react-redux'
import {signOutAuth} from '../../redux/authAction'

class NavbarApp extends React.Component{
    
render (){
    
    return (
        
    <Navbar brand={<Link to ='/'>booking app</Link>} right>
        
     
        <NavItem><NavLink className='black-text' to='/'>Поиск</NavLink></NavItem>
        <NavItem><NavLink className='black-text' to='/about'> О компании</NavLink></NavItem>
        <NavItem><NavLink className='black-text' to='/contacts'>Контакты </NavLink></NavItem>
        
        
        {this.props.isAuth === false ? (<NavItem><NavLink className='black-text' to='/login'><Icon>fingerprint</Icon></NavLink></NavItem>): null}
        {this.props.isAuth === false ? (<NavItem><NavLink className='black-text' to='/singup'><Icon>face</Icon></NavLink></NavItem>): null}
        {this.props.isAuth === true ? (<NavItem><NavLink className='black-text' to='/myorders'><Icon>shopping_cart</Icon></NavLink></NavItem>): null}
        {this.props.isAuth === true ? (<NavItem onClick={()=>{this.props.dispatch(signOutAuth())}} ><NavLink className='black-text' to='' ><Icon>lock_open</Icon></NavLink></NavItem>): null}
    </Navbar>
        
                    
    )

}

}

let mapStateToProps = (state) => {
    return {
       isAuth: state.auth.get ('isAuth')
    }
}

export default  connect (mapStateToProps) (withRouter (NavbarApp))