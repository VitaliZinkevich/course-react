import React, { Component } from 'react';
// routing
import { Route, BrowserRouter, Switch} from 'react-router-dom'
// components
import Search from './components/projectFlow/Search'
import AppNavbar from './components/layout/AppNavbar'
import AppFooter from './components/layout/AppFooter'
import About from './components/dummyComponents/About'
import Contacts from './components/dummyComponents/Contacts'
import HotelDetailes from './components/projectFlow/HotelDetailes'
import BookingForm from './components/projectFlow/BookingForm'
import NoPage from './components/dummyComponents/NoPage'
import SingUp from './components/auth/SingUp'
import MyOrders from './components/projectFlow/MyOrders'

// auth 
import ProtectedRoute from './components/auth/ProtectedRoute'
import SingIn from './components/auth/SingIn'
import { Auth } from 'aws-amplify';

// redux
import {setUser} from './redux/authAction'
import { connect } from 'react-redux'

class App extends Component{
  componentDidMount(){
   Auth.currentAuthenticatedUser()
    .then (data => {
      console.log(data)
      if (data !== "not authenticated" ) {
        this.props.dispatch (setUser (data))
      }
    })
    .catch (err => console.log(err))
  }
  render() {

    return (
  <BrowserRouter>
    <div className='container appbody'>

      <header>
        <AppNavbar/>
      </header>
 
      <Switch>
        <Route exact path='/' component={Search}/>
        <Route path='/login' component={SingIn}/>
        <Route path='/about' component={About}/>
        <Route path='/contacts' component={Contacts}/>
        <Route path='/singup' component={SingUp}/>

        <ProtectedRoute path='/myorders' component={MyOrders}/>
        <ProtectedRoute path='/booking' component={BookingForm}/>
        
        <Route path='/detailes/:id' component={HotelDetailes}/>
        <Route component={NoPage}/>
      </Switch>
        <AppFooter/>
      
    </div>
  </BrowserRouter>
      
    )
  }
}

export default connect ()(App);
