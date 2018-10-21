import {fromJS} from 'immutable'

let initState = {
        
    dateFrom:null,
    dateTo:null,
    nights:[],
    adults: null,
    children: null,
    selectedHotels:[],

}

// диспатчнуть актион и сразу получить в этот стейт копию гостиниц и строить список из него.

const seacrchFormReducer = (state = initState, action) => {
    console.log (state)
    // switch (action.type) {
        
    //     case 'HOTELS_PENDING':{
    //     let newState = fromJS(state)
    //     newState = newState.setIn (['hotelPending'], true).toJS()
        
        
    //     return newState
    //     }
    //     case 'HOTELS_FULFILLED':{
          
    //     let newState = fromJS(state)
    //     newState = newState.setIn (['hotelPending'], false).setIn(['hotels'] , action.payload.data).toJS()
        
    //     return newState}

    //     case 'HOTELS_REJECTED':{
        
    //     let newState = fromJS(state)
    //     newState = newState.setIn (['hotelPending'] ,false).setIn(['hotelPendingErrors'], action.payload).toJS()

    //     return newState}

        // case 'DONE_HOTELS': {
        //     let newState = state
        //     return newState
        // }
        
        // default:
        // return state
        // }
    return state
  }
  
export default seacrchFormReducer