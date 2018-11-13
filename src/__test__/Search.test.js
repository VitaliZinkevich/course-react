import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import { mount } from 'enzyme';

import Search from '../components/projectFlow/Search'


import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import combinedReducer from '../redux/reducer/'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'

import {seacrhFormHandleChangeRedux, priceListActivate, fetchHotels} from '../redux/hotelsActions'

import { BrowserRouter} from 'react-router-dom'

describe('Search form all render', function() {

    it ('Render with no errors',()=>{
      const store = createStore(combinedReducer, applyMiddleware(promise(),thunk));
      let instance = mount(<Provider store={store}><Search         
        /></Provider>)
       expect (instance.find('.searchFormClass').length).toBe(1)
    })

  });

 
  describe('Search form', function() {

    let instance
    let store

    beforeEach(() => {

      store = createStore(combinedReducer, applyMiddleware(promise(),thunk));
      instance = mount(<BrowserRouter><Provider store={store}><Search/></Provider></BrowserRouter>)
      store.dispatch (fetchHotels)
      instance.update()
    });



    it ('dispath form actions and appears pricelist',()=>{

    console.log(store.getState())

    store.dispatch (seacrhFormHandleChangeRedux ('dateFrom', '11.12.2018' ))
    store.dispatch (seacrhFormHandleChangeRedux ('dateTo', '15.12.2018' ))

    instance.update()

    expect (instance.find ("input[name='dateFrom']").props().value).toBe('11.12.2018')
    expect (instance.find ("input[name='dateTo']").props().value).toBe('15.12.2018')
      
    store.dispatch (priceListActivate())
    instance.update()
     
    expect (instance.find('.priceList').length).toBe(1)

  })

  });