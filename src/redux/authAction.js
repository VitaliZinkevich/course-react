import axios from 'axios'
import { Auth } from 'aws-amplify';

const GET_AUTH='GET_AUTH';

const getAuth=function(email, pass) {
  return {
    type: GET_AUTH,
    payload: Auth.signIn (email, pass) 
  }
}

const SET_USER = 'SET_USER';
const setUser = function (user) {
  return {
    type: SET_USER,
    payload: user 
  }
}

// const SET_AUTH='SET_AUTH';

// const setAuth=function(userName) {
//   return {
//     type: SET_AUTH,
//     userName
//   }
    
// }

const SING_OUT='SING_OUT';

const signOutAuth=function() {
  return {
    type: SING_OUT,
  }
    
}


const RE_NEW_ORDERS='RE_NEW_ORDERS';

const reNewOrders=function() {
  return {
    type: RE_NEW_ORDERS,
    payload: axios.get('http://localhost:8080/reneworders',{withCredentials: true}),
    
  }
    
}

export {getAuth, signOutAuth, reNewOrders, setUser}