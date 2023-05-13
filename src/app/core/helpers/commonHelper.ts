//import { JwtHelper } from "./jwtHelper";

export class CommonHelper {

  static compare(a: number | string, b: number | string, isAsc: boolean) {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  // GroupBy par un champ
  static groupByKey(array, key) {
    return array
      .reduce((hash, obj) => {
        if (obj[key] === undefined) return hash;
        return Object.assign(hash, { [obj[key]]: (hash[obj[key]] || []).concat(obj) })
      }, {})

  }

  // // Décoder un token JWT.
  // static decodeToken(token: string){
  //   var jwtHelper = new JwtHelper();
  //   return jwtHelper.decodeToken(token);
  // }

  // static uuid(): string {
  //   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
  //     /[xy]/g,
  //     function (c) {
  //       var r = (Math.random() * 16) | 0,
  //         v = c == 'x' ? r : (r & 0x3) | 0x8;
  //       return v.toString(16);
  //     }
  //   );
  // }

  static deepCopy<T>(source: T): T {
    return Array.isArray(source)
    ? source.map(item => this.deepCopy(item))
    : source instanceof Date
    ? new Date(source.getTime())
    : source && typeof source === 'object'
          ? Object.getOwnPropertyNames(source).reduce((o, prop) => {
             Object.defineProperty(o, prop, Object.getOwnPropertyDescriptor(source, prop)!);
             o[prop] = this.deepCopy((source as { [key: string]: any })[prop]);
             return o;
          }, Object.create(Object.getPrototypeOf(source)))
    : source as T;
  }

  static formatDate(date) {  
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = date.getHours();
    const minute = date.getMinutes();
  
    return `${day}/${month}/${year} à ${hour}:${minute}`;
  }

  static capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  static getTime(date?: Date) {
    return date != null ? date.getTime() : 0;
  }
  
}