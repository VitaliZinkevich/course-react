import React, { PureComponent } from 'react'
import BookingFrom from '../projectFlow/BookingForm'

import axios from 'axios'

import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
  } from "react-router-dom";

export default class ProtectedRoute extends PureComponent {
  
  check = async ()=>{

    let result =   await axios.get('http://localhost:8080/auth').then ((res)=>{
      console.log('res')
      console.log(res)
      if (res){
        console.log(this.props)
          //this.props.history.push ('/booking')
          console.log('RES TRUE')
          return res
      } else {
        
        console.log ('NO AUTH')
        console.log(res)
        return res
      }
  }) 
    
  }

  render() {

    return (
        <Route
          // {...rest}
          render={props =>
           (this.check()) ? (
              <BookingFrom {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: props.location }
                }}
              />
            )
          }
        />
      );
  }

}
