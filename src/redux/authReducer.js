import {fromJS} from 'immutable'
import { Auth } from 'aws-amplify';

let initState = {
    
    authPending: false,
    userName: "",
    isAuth: false,
    role:'user',
    rejectedError: null,
    orders:[],
    
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
            .setIn(['isAuth'], true )
            return newState
        }

        case 'SET_USER':{
            newState = newState.setIn(['authPending'], false )
            .setIn(['userName'], fromJS (action.payload.attributes.email))
            .setIn(['isAuth'], true )
            if (action.payload.signInUserSession.idToken.payload["cognito:groups"]) {
                newState = newState.setIn(['role'], fromJS (action.payload.signInUserSession.idToken.payload["cognito:groups"][0]));
            }
            return newState
        }

        case 'GET_AUTH_REJECTED':{
            console.log('GET_AUTH_REJECTED')
            newState = newState.setIn(['authPending'], false )
            .setIn(['rejectedError'], action.payload.message )
            return newState
        }
    
        case 'SET_AUTH':{
            newState = newState.setIn(['isAuth'], true)
            .setIn(['userName'],  action.userName)
            return newState

            
        }

        case 'SING_OUT':{
            Auth.signOut({ global: true })
            newState = newState.setIn(['isAuth'], false)
            .setIn(['userName'],  '')
            .setIn(['role'],  'user')
            return newState;
        }

        case 'RE_NEW_ORDERS_PENDING': {
            newState = newState.setIn(['authPending'], true)
            return newState;
        }

        case 'RE_NEW_ORDERS_FULFILLED': {
            newState = newState
                .setIn(['orders'], fromJS (action.payload))
                .setIn(['authPending'], false)
            return newState;
        }
            
    
    default:
    return newState
    }

}

export default authReducer

