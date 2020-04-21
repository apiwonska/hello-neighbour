import { FETCH_CATEGORY_THREADS } from '../actions/types'

const reducers = (state={}, action) => {
  switch (action.type) {
    case FETCH_CATEGORY_THREADS:      
      return action.payload;
    default:
      return state;
  }
}

export default reducers;