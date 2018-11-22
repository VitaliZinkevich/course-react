import {fromJS} from 'immutable'


let initState = {
    
    authPending: false,
    userName:null,
    isAuth: false,
    role:'user',
    rejectedError: null,
    orders:null,
    
}



const authReducer = (state = initState, action) => {
    let newState = fromJS(state)

    switch (action.type) {
        case 'GET_AUTH_PENDING':{

            newState = newState.setIn (['authPending'], true)
            return newState
        }

        case 'GET_AUTH_FULFILLED':{

            newState = newState.setIn(['authPending'], false )
            .setIn(['isAuth'], fromJS (action.payload.data.authStatus) )
            .setIn(['userName'], fromJS (action.payload.data.userName) )
            .setIn(['role'], action.payload.data.role)
            .setIn(['orders'], fromJS(action.payload.data.orders))
            return newState
        }

        case 'GET_AUTH_REJECTED':{
            newState = newState.setIn(['authPending'], false )
            .setIn(['rejectedError'], fromJS (action.payload.data) )
            return newState

            
        }
    
        case 'SET_AUTH':{
            newState = newState.setIn(['isAuth'], true)
            .setIn(['userName'],  action.userName)
            return newState

            
        }

        case 'SING_OUT':{
            newState = newState.setIn(['isAuth'], false)
            .setIn(['userName'],  null)
            return newState

            
        }

        case 'RE_NEW_ORDERS_FULFILLED': {
            console.log(action.payload.data)
            newState = newState.setIn(['orders'], fromJS (action.payload.data))
            return newState
        }
            
    
    default:
    return newState
    }

}

export default authReducer

