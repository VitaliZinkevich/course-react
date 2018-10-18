import axios from 'axios'

const fetchHotels = (dispatch)=>{
  dispatch ({type: 'HOTELS', payload: axios.get('http://localhost:8080/')})
  .then ( ()=>{dispatch ({type:'DONE_HOTELS'})}) // после асунк запроса выполнится этот
 
}

export {fetchHotels}