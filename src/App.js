import React, { Component } from 'react';
// routing
import { Route, BrowserRouter, Switch } from 'react-router-dom'
// components
import Search from './components/projectFlow/Search'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import About from './components/dummyComponents/About'
import Contacts from './components/dummyComponents/Contacts'
//import './App.css';

class App extends Component{
  render() {
    return (
    <BrowserRouter>
    <div className='appbody'>
      <Navbar/>      
          <Switch>
            <Route exact path='/' component={Search}/>
            <Route path='/about' component={About}/>
            <Route exact path='/contacts' component={Contacts}/>
          </Switch>
      <Footer/>
    </div>  
    </BrowserRouter>
      
    );
  }
}

export default App;
