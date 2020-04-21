import axios from 'axios';

import store from '../store';

const state = store.getState();
const token = state.token;
const auth_header = token ? `Token ${token}` : '';

export default axios.create({
  headers: {
    'Authorization': auth_header
  }
});