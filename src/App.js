import React, { Component } from 'react';
// routing
import { Route, BrowserRouter, Switch} from 'react-router-dom'
// components
import Search from './components/projectFlow/Search'
import AppNavbar from './components/layout/AppNavbar'
import AppFooter from './components/layout/AppFooter'
import About from './components/dummyComponents/About'
import Contacts from './components/dummyComponents/Contacts'
//import './App.css';

// react materialize 
import {Input, Navbar, NavItem, Button, Row} from 'react-materialize'
import $ from 'jquery'


class App extends Component{
  componentDidMount(){
   
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
        <Route path='/about' component={About}/>
        <Route exact path='/contacts' component={Contacts}/>
      </Switch>
      
      
      <AppFooter/>
      
    </div>
  </BrowserRouter>
      
    )
  }
}

export default App
