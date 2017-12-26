import jsonp from 'jsonp';
import * as REQUEST from './constants';
import {IItem, IUserData} from '../../users/store/typesData';

export default class Requset {
  public static get (method: string, params: any, callback: (error: any, data: any) => void): void {
    let stringParam: string = '';
    for (let key in params) {
      stringParam += key + '=' + params[key] + '&';
    }
    stringParam = stringParam.substring(0, stringParam.length - 1);

    jsonp(`${REQUEST.URL_VK}/${method}?${stringParam}`, null, (error, data) => callback(error, data.response));
  }

  public static getUsersList (query: string, count: number, offset: number, token: string, callback: (error: any, data: IItem[]) => void) {
    this.get(REQUEST.METHOD_SEARCH, {
        'access_token': token,
        'q': query,
        'fields' : REQUEST.PARAM_FIELDS,
        'count': count,
        'offset': offset},
    (error, data) => {
      if (error) return callback(error, null);

      let userList: IItem[] = [];
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

  public static getUserData (id: number, token: string, callback: (error: any, data: IUserData) => void) {
    this.get(REQUEST.METHOD_USER, {
        'access_token': token,
        'fields': REQUEST.PARAM_FIELDS_MORE,
        'user_ids': id
      },
      (error, data) => {
        if (error) return callback(error, null);

        let user: IUserData = {
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
