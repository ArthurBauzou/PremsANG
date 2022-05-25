import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private _http: HttpClient
  ) { }

  getAllUsers() {
    return this._http.get("http://localhost:3000/users")
  }

  getUser(id:number) {
    return this._http.get("http://localhost:3000/users/"+id)
  }

}
