import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import display from './display';

const Reducers = combineReducers({
    display,
    routing: routerReducer
});

export default Reducers;
