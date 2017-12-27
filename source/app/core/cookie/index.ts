// Зачем вы лишнюю работу делаете? Поставьте либу для работы с куками. Если хотите писат ьсвое решение стандартной проблемы
// Пишите в свободное от стажировки время
export default class Cookie {
  public static getToken (): string {
    const cookie: string = document.cookie, name = 'token';

    if (cookie.indexOf(name, 0) === -1) return null;

    let start: number = cookie.indexOf(name, 0) + name.length + 1;
    let end: number = cookie.indexOf(';', start);

    if (end === -1)
      return cookie.substring(start, cookie.length);

    return cookie.substring(start, end);
  }

  public static setToken (token: string) {
    document.cookie = `token=${token};max-age=2678400;path=/`;
  }
}
