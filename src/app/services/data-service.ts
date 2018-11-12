import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  map } from 'rxjs/operators';

const headers = new HttpHeaders().set("Content-Type", "application/json");
@Injectable()
export class DataService {
  constructor(private http: HttpClient) { }
  
  getNotebooks():Observable<any>{
      return this.http.get<any>("http://35.233.210.124:9995/api/notebook",{headers}).pipe(map(res =>this.show(res)));
  }

  show(data){
      const res =data;
      console.log(res);
      return res;
  }
}
