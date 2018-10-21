// редюсеры
import hotelsReducer from './hotelsReducer'


import { combineReducers } from 'redux';

let combinedReducer=combineReducers({

    hotelsData: hotelsReducer,
    //searchForm:  searchFormReducer,
    
});

export default combinedReducer;