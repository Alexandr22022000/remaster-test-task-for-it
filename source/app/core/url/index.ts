// Я даже разбираться не хочу в том что это и зачем этот велосипед
export default class Url {
  public static getParam (param: string): string {
    param = param + '=';
    const url: string = window.location.href;
    if (url.indexOf(param, 0) === -1) return null;

    let start: number = url.indexOf(param, 0) + param.length;
    let end: number = url.indexOf('&', start);
    end = (end === -1) ? url.length : end;
    return url.substring(start, end);
  }

  static getNewToken () {
    document.location.href = `https://oauth.vk.com/authorize?client_id=6261615&display=page&redirect_uri=${this.getCleanUrl()}&scope=friends&response_type=token&v=5.6`;
  }

  static getCleanUrl () {
    let url: string = window.location.href;
    let end: number = url.indexOf('/', 8);
    end = (end === -1) ? url.length : end;
    url = url.substring(0, end);
    url = (url.indexOf('test-hosting-00', 0) === -1) ? url : (url + '/remaster-task-for-it');
    return url;
  }
}
