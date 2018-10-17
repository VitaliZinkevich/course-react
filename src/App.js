import React, { Component } from 'react';
// routing
import { Route, BrowserRouter, Switch } from 'react-router-dom'
// components
import Search from './components/projectFlow/Search'
import NavbarApp from './components/layout/NavbarApp'
import Footer from './components/layout/Footer'
import About from './components/dummyComponents/About'
import Contacts from './components/dummyComponents/Contacts'
//import './App.css';

// react materialize 
import {SideNav, Navbar, NavItem, Button} from 'react-materialize'
import $ from 'jquery'


class App extends Component{
  componentDidMount(){
   
  }
  render() {
    return (
    <BrowserRouter>
    <div className='appbody'>

    <Navbar brand='logo' right fixed={true}>
      <NavItem> Components1</NavItem>
      <NavItem href='components.html'></NavItem>
    </Navbar> 
    
    

    <Button>SIDE NAV DEMO</Button>

          <Switch>
            <Route exact path='/' component={Search}/>
            <Route path='/about' component={About}/>
            <Route exact path='/contacts' component={Contacts}/>
          </Switch>
      <Footer/>
    </div>  
    </BrowserRouter>
      
    )
  }
}

export default App;
