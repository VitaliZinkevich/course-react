import { fromJS } from 'immutable';// immutable 

let initState = {
    
    foodTypes : ['Все включено','Без питания','Завтраки','Завтрак и ужин','Завтрак, обед и ужин'],
    starsTypes : [ '5','4','3','2'],
    hotelPending: false,
    hotelPendingErrors: null,
    hotels:[],
}

initState= fromJS(initState)

const rootReducer = (state = initState, action) => {
    
    switch (action.type) {
        
        case 'HOTELS_PENDING':{
        let newState = state.set('hotelPending', true)
        
        return newState
        }
        case 'HOTELS_FULFILLED':{
          
        let newState = state.set('hotelPending',false).set ('hotels', fromJS (action.payload.data))
        
        return newState}

        case 'HOTELS_REJECTED':{
        
        let newState = state.set('hotelPending',false).set ('hotelPendingErrors', action.payload)

        return newState}

        case 'DONE_HOTELS': {
            let newState = state
            return newState
        }
        
        default:
        return state
        }
  }
  
export default rootReducer