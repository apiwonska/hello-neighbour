import {
  FETCH_THREAD
} from '../actions/types';

const reducer = (state={}, action) => {
  switch (action.type) {
    case FETCH_THREAD:
      return action.payload;
    default:
      return state;
  }
}

export default reducer;