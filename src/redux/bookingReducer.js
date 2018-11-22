import {fromJS} from 'immutable'


let initState = {
    
    buyOptions:null
  
}



const bookingReducer = (state = initState, action) => {
    let newState = fromJS(state)

    switch (action.type) {
        case 'SAVE_BOOKING_OPTIONS':{

            newState = newState.setIn (['buyOptions'], fromJS (action.bookingOpions))
            return newState
        }
        
        case 'DEL_BOOKING_OPTIONS':{
            newState = newState.setIn (['buyOptions'], null)
            return newState
        }

    default:
    return newState
    }

}

export default bookingReducer

