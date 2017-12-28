import TypedStore from '../../core/store/typedstore';
import { action, module, mutation } from 'vuex-ts-decorators';
import * as TYPES from './types';
import {HTTP} from '../../core/HTTP';
import router from '../../core/router/routers';
import {IState, IList, IUserData} from './interfaces';
import {Status, Banner} from './appState';
import {METHOD_SEARCH, METHOD_USER, PARAM_FIELDS, PARAM_FIELDS_MORE} from '../../core/HTTP/constants';
import Url from '../../core/url';
import Cookie from '../../core/cookie';

@module
export default class UsersStore extends TypedStore {
  public token: string = '';
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
  [TYPES.A_GET_VK_AUTH_TOKEN] () {
    let token: string = Url.getParam('access_token');

    if (!token) token = Cookie.getToken();

    if (!token) Url.getNewToken();
    
    this.commit(TYPES.M_STORE_START_REQUEST);

    HTTP.get(METHOD_USER, {
      params: {
        access_token: token,
      }
    })
      .then((response) => {
        if (response.data['error']) Url.getNewToken();

        Cookie.setToken(token);
        // Нафиг его в стор класть если в куки кладете уже
        this.commit(TYPES.M_STORE_VK_AUTH_TOKEN, token);
        this.commit(TYPES.M_STORE_OK_REQUEST);
      })
      .catch((error) => {
        console.error(error);
        this.commit(TYPES.M_STORE_ERROR_REQUEST);
      });

      // Хардкод?
    this.commit(TYPES.M_STORE_VK_AUTH_TOKEN, '6cb73bab05de52dec76af86ae08f2826e79ba1d97dae34b649860dee21979618d8214715db3873832fba7');
  }
  // Этот и следующий метод выполняют одно и тоже объединить в один. Код сократиться очень сильно
  @action
  [TYPES.A_GET_USERS](query: string) {
    this.commit(TYPES.M_STORE_QUERY, query);
    this.commit(TYPES.M_STORE_START_REQUEST);
    // Бесполезное действие
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
  // Что это за дичь. Нахера вы роутер тут мучаете?
  [TYPES.A_SET_USER_ID](id: number) {
    router.push({name: 'UserPage', params: {'id': id}});
  }

  @action
  [TYPES.A_GET_USER_DATA](id: number) {
    this.commit(TYPES.M_STORE_START_REQUEST);
    HTTP.get(METHOD_USER, {
      params: {
        user_ids: id,
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

  // Нахера вы роутинг то через action делаете? Зачем это в сторе вообще? С какой целью?
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
    // Зачем лишний цикл?
    // Чтобы имя склеить?
    newUsers = newUsers.map((item) => {
      return {
        name: item.first_name + ' ' + item.last_name,
        id: item.id,
        img: item.photo_100,
      };
    });

    this.list.items = [...this.list.items, ...newUsers];
  }

  // Нахера?
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
  [TYPES.M_STORE_USER_DATA](data: any) {
    // Совет не работайте с Js датами напрямую, это та еще дичь юзайте moment
    let date: Date | number = new Date(data.bdate);
    if (date.toString() !== 'Invalid Date') {
      date = new Date().getFullYear() - date.getFullYear();
    }

    // Если юы вы не поленились описать данные в интерфейсах, то все бы выглядело так
    // this.userData = data; и все

    this.userData = {
      id: data.id,
      name: `${data.first_name} ${data.last_name}`,
      img: data.photo_400_orig ? data.photo_400_orig : 'Нет фото',
      bdate: data.bdate ? data.bdate : 'Скрыто',
      city: data.city ? data.city.title : 'Скрыто',
      age: (date.toString() !== 'Invalid Date') ? date.toString() : "Скрыто"
    };
  }
}

// Поясняю за интерфейсы в данном контексте. Это контракт между бэком и фронтом о наборе полей которые прилетают от бэка к фронту.
// Т.е.
/*
export interface User {
  id: number;

  first_name: string;

  last_name: string;
  
  screen_name?: string;

  photo_100: string;
}

это то что возвращает vk о юзере если описать для этого интерфейс. у вас даже расширение стоит для конверта json в TS интерфейс

в этом случае мы делаем вот чо

let users: Array<User> = [];

let user: User = {};

function getUsers(InUsers: Array<User>) {
  this.users = InUsers;
  либо
  this.users = this.users.concat(InUsers);
}

function getUser(InUser: User) {
  this.user = InUser;
}

ни циклов ни map функций. нифига не надо
*/
