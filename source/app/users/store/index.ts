import TypedStore from '../../core/store/typedstore';
import { action, module, mutation } from 'vuex-ts-decorators';
import * as TYPES from './types';
import Request from '../../core/HTTP/index';
import router from '../../core/router/routers';
import {IState, IItem, IList, IUserData} from './typesData';
import {Status, Banner} from './appState';

@module
export default class UsersStore extends TypedStore {
  public token: string = '6cb73bab05de52dec76af86ae08f2826e79ba1d97dae34b649860dee21979618d8214715db3873832fba7';
  public stateApp: IState = {
    appStatus: Status.OK,
    query: ''
  };
  public list: IList = {
    scroll: 0,
    banner: Banner.NONE,
    items: []
  };
  public userData: IUserData = {
    id: -1,
    name: '',
    img: '',
    bdate: '',
    city: '',
    country: '',
    education: ''
  };


  @action
  [TYPES.A_GET_VK_AUTH_TOKEN]() {
    this.commit(TYPES.M_STORE_VK_AUTH_TOKEN, '6cb73bab05de52dec76af86ae08f2826e79ba1d97dae34b649860dee21979618d8214715db3873832fba7');
  }

  @action
  [TYPES.A_GET_USERS](query: string) {
    this.commit(TYPES.M_STORE_QUERY, query);
    this.commit(TYPES.M_STORE_START_REQUEST);
    this.commit(TYPES.M_STORE_CLEAN_USERS_LIST);
    Request.getUsersList(query, 10, 0, this.token, (error: any, data: IItem[]) => {
      if (error) return this.commit(TYPES.M_STORE_ERROR_REQUEST);

      this.commit(TYPES.M_STORE_ADD_USERS, data);
      this.commit(TYPES.M_STORE_OK_REQUEST);
    });
  }

  @action
  [TYPES.A_GET_MORE_USERS]() {
    this.commit(TYPES.M_STORE_START_REQUEST);
    Request.getUsersList(this.stateApp.query, 10, this.list.items.length, this.token, (error: any, data: IItem[]) => {
      if (error) return this.commit(TYPES.M_STORE_ERROR_REQUEST);

      this.commit(TYPES.M_STORE_ADD_USERS, data);
      this.commit(TYPES.M_STORE_OK_REQUEST);
    });
  }

  @action
  [TYPES.A_SET_USER_ID](id: number) {
    router.push({name: 'UserPage'});
    this.commit(TYPES.M_STORE_USER_ID, id);
  }

  @action
  [TYPES.A_GET_USER_DATA]() {
    this.commit(TYPES.M_STORE_START_REQUEST);
    Request.getUserData(this.userData.id, this.token, (error: any, data: IUserData) => {
      if (error) return this.commit(TYPES.M_STORE_ERROR_REQUEST);

      this.commit(TYPES.M_STORE_USER_DATA, data);
      this.commit(TYPES.M_STORE_OK_REQUEST);
    });
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
  [TYPES.M_STORE_QUERY](query: string) {
    this.stateApp.query = query;
  }

  @mutation
  [TYPES.M_STORE_ADD_USERS](newUsers: IItem[]) {
    this.list.items = [...this.list.items, ...newUsers];
  }

  @mutation
  [TYPES.M_STORE_CLEAN_USERS_LIST]() {
    this.list.items = [];
  }

  @mutation
  [TYPES.M_STORE_ERROR_REQUEST]() {
    this.stateApp.appStatus = Status.ERROR;
    this.list.banner = Banner.ERROR;
  }

  @mutation
  [TYPES.M_STORE_START_REQUEST]() {
    this.stateApp.appStatus = Status.REQUESTING;
    this.list.banner = Banner.REQUESTING;
  }

@mutation
  [TYPES.M_STORE_OK_REQUEST]() {
  this.stateApp.appStatus = Status.OK;
  this.list.banner = Banner.NONE;
}

  @mutation
  [TYPES.M_STORE_USER_ID](id: number) {
    this.userData.id = id;
  }

  @mutation
  [TYPES.M_STORE_USER_DATA](data: IUserData) {
    this.userData = data;
  }
}
