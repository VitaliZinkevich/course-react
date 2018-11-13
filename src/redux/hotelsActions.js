import axios from 'axios'

// запрос отелей с сервера для построения поисковой формы
const fetchHotels = (dispatch)=>{

  
    dispatch({type: 'HOTELS', payload: axios.get('http://localhost:8080/')})
    
    
    

}



const SEARCH_FORM_CHANGE='SEARCH_FORM_CHANGE';

const seacrhFormHandleChangeRedux=function(formName, fieldValue) {
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

const LINK_WITH_SEARCH_QUERY = 'LINK_WITH_SEARCH_QUERY'
const linkWithQuerToProps=function(settings) {
  return {
    type: LINK_WITH_SEARCH_QUERY,
    settings: settings
  };
}


export {fetchHotels, seacrhFormHandleChangeRedux, priceListActivate, paginationActivePage, linkWithQuerToProps}