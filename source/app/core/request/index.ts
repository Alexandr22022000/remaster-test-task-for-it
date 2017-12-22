import jsonp from 'jsonp';
import * as REQUEST from './constants';
import {item, userData} from '../../layout/store/typesData';

export default class Requset {
  public static get (method: string, params: any, callback: (error: any, data: any) => void): void {
    /*jsonp('https://api.vk.com/method/users.search?count=10&q=alex&access_token=6cb73bab05de52dec76af86ae08f2826e79ba1d97dae34b649860dee21979618d8214715db3873832fba7', null, (error, data) => {
      console.log(data);
    });*/

    let stringParam: string = '';
    for (let key in params) {
      stringParam += key + '=' + params[key] + '&';
    }
    stringParam = stringParam.substring(0, stringParam.length - 1);

    jsonp(`${REQUEST.URL_VK}/${method}?${stringParam}`, null, (error, data) => callback(error, data.response));
  }

  public static getUsersList (query: string, count: number, offset: number, token: string, callback: (error: any, data: item[]) => void) {
    this.get(REQUEST.METHOD_SEARCH, {
        'access_token': token,
        'q': query,
        'fields' : REQUEST.PARAM_FIELDS,
        'count': count,
        'offset': offset},
    (error, data) => {
      if (error) return callback(error, null);

      let userList: item[] = [];
      for (let i: number = 1; i < data.length; i++) {
        userList.push({
          name: data[i].first_name + ' ' + data[i].last_name,
          id: data[i].uid,
          img: data[i].photo_100,
        });
      }

      callback(null, userList);
    });
  }

  public static getUserData (id: number, token: string, callback: (error: any, data: userData) => void) {
    this.get(REQUEST.METHOD_USER, {
        'access_token': token,
        'fields': REQUEST.PARAM_FIELDS_MORE,
        'user_ids': id
      },
      (error, data) => {
        if (error) return callback(error, null);

        let user: userData = {
          name: data[0].first_name + ' ' + data[0].last_name,
          id: data[0].uid,
          img: data[0].photo_100,
          bdate: data[0].bdate,
          city: data[0].city,
          country: data[0].country,
          education: data[0].education

        };

        console.log(data[0].city);

        callback(null, user);
      });
  }
}
