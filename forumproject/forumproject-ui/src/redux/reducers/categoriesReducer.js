import {
  FETCH_CATEGORIES
} from '../actions/types'

const reducer = (state=[], action) => {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return action.payload;
    default:
      return state;
  }
}

export default reducer;