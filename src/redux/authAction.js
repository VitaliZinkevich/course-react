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


export {getAuth, setAuth,signOutAuth}