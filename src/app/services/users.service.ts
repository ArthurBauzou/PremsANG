import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor( private _http: HttpClient ) { }

  getAllUsers() {
    return this._http.get("http://localhost:3000/users")
  }

  checkUser(name:string) {
    return this._http.get("http://localhost:3000/users?username="+name.toLowerCase())
  }
  
  registerUser(newUser: User) {
    return this._http.post('http://localhost:3000/users', newUser)
  }
}
