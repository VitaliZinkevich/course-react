import React from 'react'
import {fromJS} from 'immutable'
import moment from 'moment'

let initState = {
    
    // Search component connected state
    hotelPending: false,
    hotelPendingErrors: null,
    hotels:[],
    mainList:[],
    selectedHotels:[],
    search:'',
    foodType: 'Any',
    starsType:'Любой',
    dateFrom:null,
    dateTo:null,
    datesError:[],//[<div key={1} className ='red-text'>Введите 2 даты</div>, <div key={2} className ='red-text'>Заселение ПО не далее 5 дней от начала</div>, <div  key={3} className ='red-text'>Заселение С должно быть раньше Заселение ПО</div>],
    nights:[1],
    adults: 1,
    children: 0,
    // PriceList component connected state
    priceListStatus: true, // false as default
    
}



const hotelsReducer = (state = initState, action) => {

    let newState = fromJS(state)

    switch (action.type) {
        
        case 'HOTELS_PENDING':{
        newState = newState.setIn (['hotelPending'], true).toJS()
        return newState
        }

        case 'HOTELS_FULFILLED':{
        newState = newState.setIn (['hotelPending'], false).setIn(['hotels'] , action.payload.data).setIn(['mainList'] , action.payload.data).toJS()
        return newState}

        case 'HOTELS_REJECTED':{
        newState = newState.setIn (['hotelPending'] ,false).setIn(['hotelPendingErrors'], action.payload).toJS()
        return newState}

        case 'SEARCH_FORM_CHANGE': {
      
            
            if  (action.formName == 'mainList') {
                //console.log ('mainList')

                let addtoSelectedHotels = newState.get('mainList').find ((elem)=>{ return elem.get("_id") == action.fieldValue._id})
                //console.log (addtoSelectedHotels)
                let newMainList = newState.get ('mainList').filter ((element)=>{
                    if (element.get('_id')===action.fieldValue._id) {
                        return false
                    } else {
                        return true
                    }
                })
                //console.log (newMainList)
                let newSelectedHotels = newState.get ('selectedHotels').push(addtoSelectedHotels)
                //console.log ('RETURN')
                
                newState =newState.setIn(['mainList'],newMainList).setIn(['selectedHotels'],newSelectedHotels)
                return newState.toJS()
            }

            if  (action.formName == 'selectedList') {
               

                let addtoMainList = newState.get('selectedHotels').find ((elem)=>{ return elem.get("_id") == action.fieldValue._id})
                console.log (addtoMainList)
                let newSelectedHotels = newState.get ('selectedHotels').filter ((element)=>{
                    if (element.get('_id')===action.fieldValue._id) {
                        return false
                    } else {
                        return true
                    }
                })
               
                newState = newState.setIn(['selectedHotels'],newSelectedHotels)
                //console.log (newState.get ('search').indexOf (addtoMainList.get('name')))
                
                let newMainList = null
                
                if (newState.get ('search') === '' && (newState.get ('starsType')) === 'Любой'){
                    console.log('ALL CLEAR')
                    newMainList = newState.get ('mainList'). push (addtoMainList)
                }

                //console.log (addtoMainList.get('name').toLowerCase().indexOf (newState.get ('search').toLowerCase()))
                if (newState.get ('starsType') === 'Любой' && newState.get ('search')!=="" && addtoMainList.get('name').toLowerCase().indexOf (newState.get ('search').toLowerCase()) !== -1){
                    console.log('starsType CLEAR seacrh ++++')
                    newMainList = newState.get ('mainList').push (addtoMainList)
                }

                if (newState.get ('search') === '' && parseInt(newState.get ('starsType')) === addtoMainList.get ('stars')) {
                    console.log('seacrh CLEAR starsType ++++')

                    newMainList = newState.get ('mainList').push (addtoMainList)
                } 

                if (newState.get ('search') !== "" && addtoMainList.get('name').toLowerCase().indexOf (newState.get ('search').toLowerCase())!== -1 && parseInt(newState.get ('starsType')) === addtoMainList.get ('stars')) {
                    console.log('seacrh ++++ starsType ++++')
                    newMainList = newState.get ('mainList').push (addtoMainList)
                } 
                //console.log (newMainList)
                if (newMainList != null) {
                    newState = newState.setIn(['mainList'],newMainList)
                }
                
                
                return newState.toJS()
            }

            if (action.formName == 'search' || action.formName == 'starsType') {
                
                if ( action.formName == 'starsType') {
                    newState = newState.setIn(['starsType'],action.fieldValue)
                } else {
                    newState = newState.setIn(['search'],action.fieldValue)
                }
                
                
                let newMainList 

                // проверям текстовый фильтр

                if (newState.get('search') === '') {
                    newMainList = newState.get ('hotels')
                } else {
                    newMainList = newState.get ('hotels').filter((el)=>{
                        if (el.get('name').toLowerCase().indexOf(newState.get('search').toLowerCase()) === -1 ){
                            return false
                        } else {
                            return true                   
                        }
        
                    })
                }
             
                // проверяем уже выбранные объекты

                if (newState.get('selectedHotels').isEmpty() == true) {
                    
                    // пусто ничего не меняем
                } else {
                    newMainList = newMainList.filter((el)=>{
                        
                     if (newState.get('selectedHotels').indexOf(el) === -1) {
                        return true
                     } else {
                        return false
                     }
                    })
                }
               
                // Проверям звезды

                if (newState.get('starsType') === 'Любой') {
                    // ничего не меняем
                } else {
                    newMainList = newMainList.filter ((el)=>{
                        if (el.get('stars') === parseInt(newState.get('starsType'))) {
                            return true
                        } else {
                            return false
                        }
                    })

                }
               
                    newState = newState.setIn(['mainList'], newMainList)
                    return newState.toJS()
                }

            if (action.formName == 'foodType') {
                newState = newState.setIn (['foodType'], action.fieldValue )
                
               return newState.toJS()

            }
            
            if (action.formName == 'children' || action.formName == 'adults') {

                if (action.formName == 'children') {
                    newState = newState.setIn (['children'], action.fieldValue )
                } else  {
                    newState = newState.setIn (['adults'], action.fieldValue )
                }
 
               return newState.toJS()

            }

            if (action.formName == 'nights'){

                let newNightsList =  newState.get ('nights')

                if (newNightsList.indexOf (action.fieldValue) === -1 ) {
                    newNightsList = newNightsList.push(action.fieldValue)
                    console.log('-1')
                } else {
                    console.log('DELETE N')
                    newNightsList = newNightsList.filter ((el)=>{
                        if (el === action.fieldValue) {
                                return false
                            } else {
                                return true
                            }
                        })
                }

                newState = newState.setIn (['nights'], newNightsList )

                return newState.toJS()
            }

            if (action.formName == 'dateFrom' || action.formName == 'dateTo') {
               
                if (action.formName == 'dateFrom') {
                    newState = newState.setIn (['dateFrom'], action.fieldValue)
                } else {
                    newState = newState.setIn (['dateTo'], action.fieldValue)
                }

                newState = newState.setIn (['datesError'], chekStartDates (newState.get('dateFrom'), newState.get('dateTo')))
                

                return newState.toJS()
            }
             
            
        }
        
        case 'PRICE_LIST_ACTIVATE':{
            console.log ('PRICE_LIST_ACTIVATE CASE')
            newState = newState.setIn (['priceListStatus'], true)
            return newState.toJS()

        }

        default:
        return newState.toJS()
        }
   
  }
  
export default hotelsReducer

// проверить даты и вернуть массив ошибок

function chekStartDates (startFrom, startTo) {
   
   let errors = []

   let start = moment(startFrom, "DD-MM-YYYY")
   let end = moment(startTo, "DD-MM-YYYY")

   if (start.isValid() && end.isValid()) {
       
   // console.log (end.diff (start, 'days'))
    if (end.diff (start, 'days') > 5 ){
        errors.push(<div key={1} className ='red-text'>Заселение по не далее 5 дней от начала</div>)
        errors.push(<br/>)
    }

    if (!moment(start).isSameOrBefore(end)) {
        errors.push(<div key={2} className ='red-text'>Заселение С должно быть раньше Заселение ПО</div>)
        errors.push(<br/>)
    }

   } else {
    errors.push(<div key={1} className ='red-text'>Введите 2 даты</div>)
    errors.push(<br key={4}/>)
    errors.push(<div key={2} className ='red-text'>Заселение ПО не далее 5 дней от начала</div>)
    errors.push(<br key={5}/>)
    errors.push(<div  key={3} className ='red-text'>Заселение С должно быть раньше Заселение ПО</div>)
   }
   
return errors


}