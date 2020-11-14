import Axios from 'axios';
import UserService from './userService';

const createServices = () => ({
  userService: new UserService(Axios),
});

export default createServices;
