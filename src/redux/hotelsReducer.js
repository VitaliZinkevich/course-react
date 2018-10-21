import {fromJS} from 'immutable'

let initState = {
        
    foodTypes : ['Любое', 'Без питания','Завтраки','Завтрак и ужин','Завтрак, обед и ужин', 'Все включено'],
    starsTypes : [ 'Любой','2','3','4','5'],
    hotelPending: false,
    hotelPendingErrors: null,
    hotels:[],
    mainList:[],
    selectedList:[],
    
}

//console.log (initState)
//initState= fromJS(initState)
//console.log (initState.get('hotels').get('foodTypes').toJS())

const hotelsReducer = (state = initState, action) => {
    
    switch (action.type) {
        
        case 'HOTELS_PENDING':{
        let newState = fromJS(state)
        newState = newState.setIn (['hotelPending'], true).toJS()
        
        
        return newState
        }
        case 'HOTELS_FULFILLED':{
          
        let newState = fromJS(state)
        newState = newState.setIn (['hotelPending'], false).setIn(['hotels'] , action.payload.data).setIn(['mainList'] , action.payload.data).toJS()
        
        return newState}

        case 'HOTELS_REJECTED':{
        
        let newState = fromJS(state)
        newState = newState.setIn (['hotelPending'] ,false).setIn(['hotelPendingErrors'], action.payload).toJS()

        return newState}

        case 'CHANGE_VEW': {
            let newState = fromJS(state)
            
            return newState
        }
        
        default:
        return state
        }
   
  }
  
export default hotelsReducer