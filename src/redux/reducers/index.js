import { combineReducers } from 'redux';

const reducers = combineReducers({
  isSignedIn: () => true,
  test: () => 'test'
});

export default reducers;