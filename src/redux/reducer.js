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
        
        case 'FOO_PENDING':{
        console.log ('inside foo pending')
        let newState = state.set('hotelPending', true)
        
        console.log (newState)
        return newState
        
        }
        
        case 'FOO_FULFILLED':{
        let newState = state.set('hotelPending',false)
        newState = newState.set ('hotels', action.payload.data)
        return newState}
        
        default:
        return state
        }
  }
  
export default rootReducer