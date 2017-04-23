import { combineReducers } from 'redux';
import fuelSavings from './fuelSavingsReducer';
import {routerReducer} from 'react-router-redux';
import LoginReducer from './LoginReducer';
import SearchPageReducer from './SearchPageReducer';

const rootReducer = combineReducers({
  fuelSavings,
  LoginReducer,
  SearchPageReducer,  
  routing: routerReducer
});
console.log('rootReducer',rootReducer);

export default rootReducer;
