import axios from 'axios'

// запрос отелей с сервера для построения поисковой формы
const fetchHotels = (dispatch)=>{
  dispatch ({type: 'HOTELS', payload: axios.get('http://localhost:8080/')})
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


const PRICE_LIST_ACTIVATE='PRICE_LIST_ACTIVATE';

const priceListActivate=function() {
  return {
    type: PRICE_LIST_ACTIVATE,
  };
}

const PAGINATION_ACTIVE_PAGE = 'PAGINATION_ACTIVE_PAGE'

const paginationActivePage=function(page) {
  return {
    type: PAGINATION_ACTIVE_PAGE,
    page:page
  };
}


export {fetchHotels, seacrhFormHandleChangeRedux, priceListActivate, paginationActivePage}