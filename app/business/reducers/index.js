import {combineReducers} from 'redux';
//Profile
import ExapleReductor from './ExapleReductor';

const rootReducer = combineReducers({
  Exaple: ExapleReductor,
});

export default rootReducer;
