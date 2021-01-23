import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(protected http: HttpClient) { }

  getGetUsers(){
    return this.http.get("https://randomuser.me/api/?results=10");
  }
}
