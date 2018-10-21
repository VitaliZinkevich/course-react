import axios from 'axios'

// запрос отелей с сервера для построения поисковой формы
const fetchHotels = (dispatch)=>{
  dispatch ({type: 'HOTELS', payload: axios.get('http://localhost:8080/')})
  //.then ( ()=>{dispatch ({type:'DONE_HOTELS'})}) // после асунк запроса выполнится этот
 
}

export {fetchHotels}