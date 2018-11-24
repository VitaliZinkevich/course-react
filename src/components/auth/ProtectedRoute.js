import React from "react";
import { Route, Redirect} from "react-router-dom";
import PropTypes from 'prop-types';



import { connect } from 'react-redux'


 function ProtectedRoute({ component: Component, ...rest }) {
   
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

ProtectedRoute.propTypes= {
  authStatus: PropTypes.bool,
}

export default connect (mapStateToProps)(ProtectedRoute)