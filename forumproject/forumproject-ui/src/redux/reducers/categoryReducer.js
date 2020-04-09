import {
  FETCH_CATEGORY
} from '../actions/types'

const reducers = (state={}, action) => {
  switch (action.type) {
    case FETCH_CATEGORY:      
      return action.payload;
    default:
      return state;
  }
}

export default reducers;