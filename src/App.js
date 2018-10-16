import React, { Component } from 'react';

import { Route, BrowserRouter, Switch } from 'react-router-dom'

import Search from './components/projectFlow/Search'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'


//import './App.css';

class App extends Component{
  render() {
    return (
    <BrowserRouter>
      <div>
        <Navbar/>      
          <Switch>
                  <Route exact path='/' component={Search}/>
          </Switch>
        <Footer/>
      </div>
    </BrowserRouter>
      
    );
  }
}

export default App;
