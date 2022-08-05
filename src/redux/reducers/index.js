import { combineReducers } from 'redux';
import user from './user';
// import nomeReducer2 from './nomeReducer2';

const rootReducer = combineReducers({
  user,
  // nomeReducer2,
});

export default rootReducer;
