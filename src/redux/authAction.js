import axios from 'axios'

const GET_AUTH='GET_AUTH';

const getAuth=function(formName, fieldValue) {
  return {
    type: GET_AUTH,
    payload: axios.get('http://localhost:8080/auth')}
   };
}
