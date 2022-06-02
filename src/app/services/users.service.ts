import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public userObs

  constructor(
    private _http: HttpClient, 
    private _jwtHelper: JwtHelperService 
  ) { 
    let token: string | null = localStorage.getItem('accessToken')
    let tokenClair
    if (token != null) { tokenClair = this._jwtHelper.decodeToken(token) }
    else { tokenClair = new User() } 
    this.userObs = new BehaviorSubject(tokenClair)
  }
  
  login(name:string, password:string):any {
    this.checkUser(name).subscribe((u:any)=>{
      if (u.length != 0) {
        if (password == u[0].password) {
          let logUser = new User(
            u[0].username,
            u[0].name,
            u[0].avatar,
            u[0].email,
            u[0].roles
          )
          this.userObs = new BehaviorSubject(logUser)
          console.log(this.userObs.asObservable());
          return this.userObs.asObservable();

          // return this.userObs.asObservable()
        } else {
          console.log('mauvais mot de passe');
          const err = new Error("mauvais mot de passe")
          return err
          // throw throwError(()=>{
          //   const err = new Error("mauvais mot de passe")
          //   return err
          // })
        }
      } else {
        console.log('util non trouvé');
        const err = new Error("cet utilisateur n’existe pas")
        return err
        // throw throwError(()=>{
        //   const err = new Error("cet utilisateur n’existe pas")
        //   return err
        // }) 
      }
      //     return {status: "ok", code: '00', msg: `${u[0].name} logged in`}
      //   } else { return {status: "err", code: '01', msg: `mauvais mot de passe`} }
      // } else { return {status: "err", code: '02', msg: `cet utilisateur n’existe pas`} }
    })
  }

  disconnect() {
    let logUser = new User()
    this.userObs = new BehaviorSubject(logUser)
    return this.userObs.asObservable()
  }

  getCurrentUser() {
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
