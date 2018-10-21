// редюсеры
import hotelsReducer from './hotelsReducer'
import searchFormReducer from './searchFormReducers'

import { combineReducers } from 'redux';

let combinedReducer=combineReducers({

    hotelsData: hotelsReducer,
    searchForm:  searchFormReducer,
    
});

export default combinedReducer;