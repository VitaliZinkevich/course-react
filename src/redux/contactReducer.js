import {fromJS} from 'immutable'

let initState = {
    send: false,
}

const contactReducer = (state = initState, action) => {
    let newState = fromJS(state)

    switch (action.type) {

        case 'CONTACT_FORM_SENDED_FULFILLED':{
            newState = newState.setIn (['send'], true)
            return newState
        }

    default:
    return newState
    }
}

export default contactReducer