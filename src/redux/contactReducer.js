import {fromJS} from 'immutable'

let initState = {
    send: false,
    contactFormPending: false,
    contactFormErrors: ''
}

const contactReducer = (state = initState, action) => {
    let newState = fromJS(state)

    switch (action.type) {

        case 'CONTACT_FORM_SENDED_FULFILLED':{
            newState = newState
                .setIn (['send'], true)
                .setIn (['contactFormPending'], false)
            return newState;
        };

        case 'CONTACT_FORM_SENDED_PENDING':{
            newState = newState
                .setIn (['contactFormPending'], true)
            return newState;
            }
    
        case 'CONTACT_FORM_SENDED_REJECTED':{
        newState = newState
            .setIn (['contactFormPending'] ,false)
            .setIn(['contactFormErrors'], action.payload)
        return newState
        }
    default:
    return newState
    }
}



export default contactReducer