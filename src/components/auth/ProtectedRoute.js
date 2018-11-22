import React from "react";
import {
  Route,
  Redirect,
  
} from "react-router-dom";

import { connect } from 'react-redux'


 function ProtectedRoute({ component: Component, ...rest }) {
   //console.log(rest)
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


let mapStateToProps = (state) => {
    
  return {
      authStatus: state.auth.get ('isAuth'),
      }
}

export default connect (mapStateToProps)(ProtectedRoute)