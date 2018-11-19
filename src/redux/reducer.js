// редюсеры
import hotelsReducer from './hotelsReducer'
import authReducer from './authReducer'
import bookingReducer from './bookingReducer'


import { combineReducers } from 'redux';

let combinedReducer=combineReducers({

    hotelsData: hotelsReducer,
    auth:  authReducer,
    bookingReducer: bookingReducer,
    
});

export default combinedReducer;