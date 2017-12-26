import axios from 'axios';
import jsonpAdapter from 'axios-jsonp';
import {URL_VK} from './constants';

export const HTTP = axios.create({
  baseURL: URL_VK,
  adapter: jsonpAdapter,
});
