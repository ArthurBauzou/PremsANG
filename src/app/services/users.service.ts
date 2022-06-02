import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public userObs

  constructor( private _http: HttpClient, private _jwtHelper: JwtHelperService ) { 
    let token: string | null = localStorage.getItem('accessToken')
    let tokenClair
    if (token != null) {
      tokenClair = this._jwtHelper.decodeToken(token)
      console.log(`Y’a un token pour ${tokenClair.name}`)
    }
    // this.provideCurrentUser.emit(this.currentUser)
    this.userObs = new BehaviorSubject(tokenClair)
  }
  
  provideCurrentUser = new EventEmitter();
  
  getCurrentUser() {
    console.log(this.userObs.asObservable())
    return this.userObs.asObservable()
  }

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
