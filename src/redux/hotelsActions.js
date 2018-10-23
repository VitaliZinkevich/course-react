import axios from 'axios'

// запрос отелей с сервера для построения поисковой формы
const fetchHotels = (dispatch)=>{
  dispatch ({type: 'HOTELS', payload: axios.get('http://flocalhost:8080/')})
  //.then ( ()=>{dispatch ({type:'DONE_HOTELS'})}) // после асунк запроса выполнится этот
 
}

const SEARCH_FORM_CHANGE='SEARCH_FORM_CHANGE';

const seacrhFormHandleChangeRedux=function(formName, fieldValue, hotelsList) {
  return {
    type: SEARCH_FORM_CHANGE,
    formName,
    fieldValue
  };
}

export {fetchHotels, seacrhFormHandleChangeRedux}