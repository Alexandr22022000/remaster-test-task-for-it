import jsonp from 'jsonp';
import * as REQUEST from './constants';

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

    jsonp(`${REQUEST.URL_VK}/${method}?${stringParam}`, null, callback);
}
}
