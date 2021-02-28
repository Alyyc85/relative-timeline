import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';

const baseUrl = 'https://jsonplaceholder.typicode.com/';

@Injectable()
export class AppService {
  private _counterUser = 0;
  private _internalArray = [];

  // Vars for manipulate Jsonplaceholder data and
  // mapped it with DateTime values
  private _dateToApply = [
    moment(),
    moment().subtract(1, 'days').subtract(3, 'hours').add(43, 'seconds'),
    moment().subtract(3, 'days').subtract(8, 'hours').subtract(12, 'seconds'),
    moment().subtract(4, 'days').subtract(5, 'hours'),
    moment().subtract(7, 'days'),
  ];
  constructor(private http: HttpClient) {}

  list$(): Observable<any> {
    ++this._counterUser;
    return this.http.get(`${baseUrl}posts?userId=${this._counterUser}`).pipe(
      map((res: any[]) => {
        const mapped = res.map((r, i) => {
          let date: moment.Moment;
          switch (i) {
            case 0:
            case 1:
              date = this._dateToApply[0];
              break;
            case 2:
            case 3:
              date = this._dateToApply[1];
              break;
            case 4:
            case 5:
              date = this._dateToApply[2];
              break;
            case 6:
            case 7:
              date = this._dateToApply[3];
              break;
            case 8:
            case 9:
              date = this._dateToApply[4];
              break;
          }
          return {
            ...r,
            date: date,
          };
        });
        const toRet = [...this._internalArray, ...mapped];
        this._internalArray = toRet;
        return toRet;
      }),
      share()
    );
  }
}
