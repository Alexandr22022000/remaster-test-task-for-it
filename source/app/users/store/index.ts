import TypedStore from '../../core/store/typedstore';
import { action, module, mutation } from 'vuex-ts-decorators';
import * as TYPES from './types';
import {HTTP} from '../../core/HTTP';
import router from '../../core/router/routers';
import {IState, IList, IUserData} from './interfaces';
import {Status, Banner} from './appState';
import {METHOD_SEARCH, METHOD_USER, PARAM_FIELDS, PARAM_FIELDS_MORE} from '../../core/HTTP/constants';

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
    age: ''
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

    HTTP.get(METHOD_SEARCH, {
      params: {
        q: query,
        count: 10,
        access_token: this.token,
        fields: PARAM_FIELDS
      }
    })
      .then((response) => {
        this.commit(TYPES.M_STORE_ADD_USERS, response.data['response']['items']);
        this.commit(TYPES.M_STORE_OK_REQUEST);
      })
      .catch((error) => {
        console.error(error);
        this.commit(TYPES.M_STORE_ERROR_REQUEST);
      });
}

  @action
  [TYPES.A_GET_MORE_USERS]() {
    this.commit(TYPES.M_STORE_START_REQUEST);

    HTTP.get(METHOD_SEARCH, {
      params: {
        q: this.stateApp.query,
        count: 10,
        offset: this.list.items.length,
        access_token: this.token,
        fields: PARAM_FIELDS
      }
    })
      .then((response) => {
        this.commit(TYPES.M_STORE_ADD_USERS, response.data['response']['items']);
        this.commit(TYPES.M_STORE_OK_REQUEST);
      })
      .catch((error) => {
        console.error(error);
        this.commit(TYPES.M_STORE_ERROR_REQUEST);
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
    HTTP.get(METHOD_USER, {
      params: {
        user_ids: this.userData.id,
        access_token: this.token,
        fields: PARAM_FIELDS_MORE
      }
    })
      .then((response) => {
        this.commit(TYPES.M_STORE_USER_DATA, response.data['response'][0]);
        this.commit(TYPES.M_STORE_OK_REQUEST);
      })
      .catch((error) => {
        console.error(error);
        this.commit(TYPES.M_STORE_ERROR_REQUEST);
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
  [TYPES.M_STORE_ADD_USERS](newUsers: any[]) {
    newUsers = newUsers.map((item) => {
      return {
        name: item.first_name + ' ' + item.last_name,
        id: item.id,
        img: item.photo_100,
      };
    });

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
  [TYPES.M_STORE_USER_DATA](data: any) {
    let date: Date | number = new Date(data.bdate);
    if (date.toString() !== 'Invalid Date') {
      date = new Date().getFullYear() - date.getFullYear();
    }

    this.userData = {
      id: data.id,
      name: `${data.first_name} ${data.last_name}`,
      img: data.photo_100,
      bdate: data.bdate ? data.bdate : 'Скрыто',
      city: data.city.title ? data.city.title : 'Скрыто',
      age: (date.toString() !== 'Invalid Date') ? date.toString() : "Скрыто"
    };
  }
}
