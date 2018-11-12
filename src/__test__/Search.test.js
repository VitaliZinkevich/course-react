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

// import {fromJS} from 'immutable'

// import configureStore from 'redux-mock-store'
 
// create any initial state needed
// let initialState = {hotelsData: {
    
//     // Search component connected state
//     hotelPending: false,
//     hotelPendingErrors: '',
//     hotels:[{"_id" : "5b06859e5089ec123b9e668c",
//     "type" : "санаторий",
//     "name" : "Берестье",
//     "region" : "Минская область",
//     "stars" : 2,
//     "rooms": [{name:'Одноместный номер', accomodation:['1+0', '1+1'], price:{adult: 1000, children: 300} },
//             {name:'Двухместный номер', accomodation:['2+0', '2+1','2+2'], price:{adult: 1500, children: 400} },
//             {name:'Двухместный номер люкс', accomodation:['2+0', '2+1','2+2','3+0'], price:{adult: 1600, children: 500} }],
//     description: {
//         text:'санаторий Берестье (КУП «Брестагроздравница») расположен на территории курорта Белое озеро в Брестском районе. Санаторий находится в окружении массива сосново-лиственного леса уникального биосферного резервата и ландшафтного заказника «Прибужское Полесье». Территория санатория примыкает к озеру Рогознянское, которое соединяется каналом с озером Белое, Черное и далее Тайное. На территории санатория произрастают сосна, ель, береза, плодово-садовые деревья.',
//         fotos:['https://sanatorii.by/images/obj/89/c2598he5_433_true.jpg', 'http://belarus.svobodno.su/images/recovery/sanatoriy-bereste-0.jpg', 'https://i.ytimg.com/vi/h1TaZmN2waY/maxresdefault.jpg']
//     }

//     },
//     {"_id" : "5b06859e5089ec123b9e668f",
//     "type" : "санаторий",
//     "name" : "Белая вежа",
//     "region" : "Минская область",
//     "stars" : 3,
//     "rooms": [{name:'Одноместный номер с балконом', accomodation:['1+0', '1+1'], price:{adult: 1000, children: 300} },
//                 {name:'Двухместный двухкомнаный номер', accomodation:['2+0', '2+1','2+2'], price:{adult: 1500, children: 400} },
//                 {name:'Двухместный номер двухкомнаный номер люкс', accomodation:['2+0', '2+1','2+2','3+0'], price:{adult: 1600, children: 500} }]
//     }],
//     mainList:[],
//     selectedHotels:[],
//     search:'',
//     foodType: 'Any',
//     starsType:'Любой',
//     dateFrom:null,
//     dateTo:null,
//     datesError:[],//[<div key={1} className ='red-text'>Введите 2 даты</div>, <div key={2} className ='red-text'>Заселение ПО не далее 5 дней от начала</div>, <div  key={3} className ='red-text'>Заселение С должно быть раньше Заселение ПО</div>],
//     nights:[1],
//     adults: 1,
//     children: 0,
//     formMessages:[],
//     // PriceList component connected state
//     priceListStatus: false, // false as default
//     currentPage: 1,
//     isGetQueryString: false
// }}

// initialState = fromJS (initialState.hotelsData)

// // here it is possible to pass in any middleware if needed into //configureStore
// const mockStore = configureStore();

// let store;
// beforeEach(() => {
//   //creates the store with any initial state or middleware needed  
//   store = mockStore(initialState)
  
//  })

const store = createStore(combinedReducer, applyMiddleware(promise(),thunk));

describe('Search form', function() {

    it ('Render with no errors',()=>{
        let instance = mount(<Provider store={store}><Search 
            
        /></Provider>)
       expect (instance.find('.searchFormClass').length).toBe(1)
    })

  });


  describe('Search form', function() {

    it ('Warnings',()=>{
        let instance = mount(<Provider store={store}
            
        ><Search 
        valueFrom={'11.11.2018'}
        valueTo={'15.11.2018'}
        /></Provider>)
   
        let dateFrom = instance.find("Input[name='dateFrom']")
        
   
       console.log(dateFrom.debug())
       console.log(dateFrom.props())


    })

  });