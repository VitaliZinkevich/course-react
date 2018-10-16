import axios from 'axios'

const fetchHotels = (dispatch)=>{
  dispatch ({type: 'FOO', payload: axios.get('http://localhost:8080/')})    
}

export {fetchHotels}