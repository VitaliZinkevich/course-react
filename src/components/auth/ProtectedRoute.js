import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

import axios from 'axios'
import { connect } from 'react-redux'


 function ProtectedRoute({ component: Component, ...rest }) {
   console.log(rest)
  return (
    <Route
      {...rest}
      render={props =>
        rest.authStatus ? ( // результ запроса залогинен юзер или нет
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: rest.location.pathname }
            }}
          />
        )
      }
    />
  );
}


// const fakeAuth = {
//   isAuthenticated: false,
//   authenticate(cb) {
//     this.isAuthenticated = true;
//     setTimeout(cb, 100); // fake async
//   },
//   signout(cb) {
//     this.isAuthenticated = false;
//     setTimeout(cb, 100);
//   }
// };


let mapStateToProps = (state) => {
    
  return {
      authStatus: state.auth.get ('isAuth'),
      }
}

export default connect (mapStateToProps)(ProtectedRoute)