import axios from 'axios';
import store from '../redux/store';

const forum = () => {
  const instance = axios.create();
  const token = store.getState().auth.authenticated;
  const auth_header = token ? `Token ${token}` : '';
  instance.defaults.headers.common.Authorization = auth_header;
  instance.defaults.headers.post['Content-Type'] = 'application/json';
  return instance;
};

export default forum;
