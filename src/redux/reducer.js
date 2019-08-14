// редюсеры
import hotelsReducer from './hotelsReducer'
import authReducer from './authReducer'
import bookingReducer from './bookingReducer'
import contactReducer from './contactReducer'


import { combineReducers } from 'redux';

let combinedReducer=combineReducers({

    hotelsData: hotelsReducer,
    auth:  authReducer,
    bookingReducer: bookingReducer,
    contacts : contactReducer
    
});

export default combinedReducer;