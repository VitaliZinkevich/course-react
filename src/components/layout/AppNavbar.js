import React from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'

import {Navbar,NavItem} from 'react-materialize'
import {connect} from 'react-redux'
import {signOutAuth} from '../../redux/authAction'

import PropTypes from 'prop-types';


class NavbarApp extends React.Component{
    
    static propTypes ={
        authPending: PropTypes.bool,
    }

render (){
    
    return (
        
    <Navbar 
    brand={<Link to ='/'>booking app</Link>} 
    right
    className='blue white-text'
    >
        
     
        <NavItem><NavLink to='/'>Поиск</NavLink></NavItem>
        {/* <Icon>fingerprint</Icon>
        <Icon>face</Icon>
        <Icon>shopping_cart</Icon> 
        <Icon>lock_open</Icon>*/}
        {this.props.isAuth === false ? (<NavItem><NavLink to='/login'>Войти</NavLink></NavItem>): null}
        {this.props.isAuth === false ? (<NavItem><NavLink to='/singup'>Зарегистрироваться</NavLink></NavItem>): null}
        {this.props.isAuth === true ? (<NavItem><NavLink to='/myorders'>Мои заказы</NavLink></NavItem>): null}
                
        <NavItem><NavLink to='/about'> О компании</NavLink></NavItem>
        <NavItem><NavLink to='/contacts'>Контакты </NavLink></NavItem>
        {this.props.isAuth === true ? (<NavItem onClick={()=>{this.props.dispatch(signOutAuth())}} ><NavLink to='' >Выйти</NavLink></NavItem>): null}

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