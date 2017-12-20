import TypedStore from '../../core/store/typedstore';
import { action, module, mutation } from 'vuex-ts-decorators';
import * as TYPES from './types';
import { VueRouter } from 'vue-router/types/router';
import router from '../router/routers'


type state = {
  status: string,
  username: string,
  search: string 
}

type item = {
  name: string,
  img: string,
  id: number
}

type list = {
  scroll: number,
  banner: string,
  items: item[],

}

type userData = {
  id: number,
  name: string,
  img: string
}

@module
export default class LayoutStore extends TypedStore {
  /*
  TEST_TEST_TEST
  */
  private TEST_USERS: item[] = [
    {id: 1, name: 'Vasa', img: 'https://softboard.ru/uploads/profile/photo-thumb-119634.jpg'},
    {id: 1, name: 'Vasa', img: 'https://softboard.ru/uploads/profile/photo-thumb-119634.jpg'}
  ];
  private TEST_USER: userData = 
    {id: 1, name: 'Vasa', img: 'https://softboard.ru/uploads/profile/photo-thumb-119634.jpg'};  

  public token: string = '';
  public state: state = {
    status: '',
    username: '',
    search: ''
  }

  public list: list = {
    scroll: 0,
    banner: '',
    items: []
  }

  public userData: userData = {
    id: -1,
    name: '',
    img: ''
  }


  @action
  [TYPES.A_GET_VK_AUTH_TOKEN]() {
    this.commit(TYPES.M_STORE_VK_AUTH_TOKEN, 'token');
  }

  @action
  [TYPES.A_GET_USERS]() {
    this.commit(TYPES.M_STORE_ADD_USERS, this.TEST_USERS);
  }

  @action
  [TYPES.A_GET_MORE_USERS]() {
    this.commit(TYPES.M_STORE_ADD_USERS, this.TEST_USERS);
  }

  @action
  [TYPES.A_SET_USER_ID]() {
    router.push({name: 'UserPage'});
    this.commit(TYPES.M_STORE_USER_ID, 50);
  }

  @action
  [TYPES.A_GET_USER_DATA]() {
    this.commit(TYPES.M_STORE_USER_DATA, this.TEST_USER);
  }

  @action
  [TYPES.A_GO_TO_BACK]() {
    router.push({name: 'UsersList'});
  }


  @mutation
  [TYPES.M_STORE_VK_AUTH_TOKEN](token: string) {
    this.token = token;
  }

  @mutation
  [TYPES.M_STORE_ADD_USERS](newUsers: item[]) {
    this.list.items = [...this.list.items, ...newUsers];
  }

  @mutation
  [TYPES.M_STORE_CLEAN_USERS_LIST]() {
    this.list.items = [];
  }

  @mutation
  [TYPES.M_STORE_ERROR_REQUEST]() {
    this.state.status = '';
  }

  @mutation
  [TYPES.M_STORE_START_REQUEST]() {
    this.state.status = '';
  }

  @mutation
  [TYPES.M_STORE_USER_ID](id: number) {
    this.userData.id = id;
  }

  @mutation
  [TYPES.M_STORE_USER_ID](data: userData) {
    this.userData = data;
  }
}
