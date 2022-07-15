import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  getParams(filters:any, extraParams?:any) {
    let params = extraParams || new HttpParams();
    if(filters){
      Object.keys(filters).filter(key => {
        params = params.append(key, filters[key]);
      });
    }
    return params;
  }
}
