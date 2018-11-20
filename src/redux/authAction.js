import axios from 'axios'

const GET_AUTH='GET_AUTH';

const getAuth=function(email, pass) {
  return {
    type: GET_AUTH,
    payload: axios.post('http://localhost:8080/auth', {
      email: email,
      pass: pass
    }),
  }
    
}

const SET_AUTH='SET_AUTH';

const setAuth=function(userName) {
  return {
    type: SET_AUTH,
    userName
  }
    
}

const SING_OUT='SING_OUT';

const signOutAuth=function() {
  return {
    type: SING_OUT,
    
  }
    
}


const RE_NEW_ORDERS='RE_NEW_ORDERS';

const reNewOrders=function(userName) {
  return {
    type: RE_NEW_ORDERS,
    payload: axios.get('http://localhost:8080/reneworders'),
    userName
  }
    
}

export {getAuth, setAuth,signOutAuth, reNewOrders}