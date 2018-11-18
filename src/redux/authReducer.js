import {fromJS} from 'immutable'


let initState = {
    
    isAuth: false,

}



export const authReducer = (state = initState, action) => {
    let newState = fromJS(state)

    switch (action.type) {

    
    
    
    
    default:
    return newState
    }

}

