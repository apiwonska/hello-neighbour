import axios from 'axios';
import store from '../redux/store';

const forum = () => {
  const instance = axios.create();
  const token = store.getState().auth.authenticated;
  const authHeader = token ? `Token ${token}` : '';
  instance.defaults.headers.common.Authorization = authHeader;
  instance.defaults.headers.post['Content-Type'] = 'application/json';
  return instance;
};

export default forum;
