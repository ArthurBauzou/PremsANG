import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public userObs

  refreshUser = new EventEmitter  
  newUserRegistered = new EventEmitter

  constructor(
    private _http: HttpClient, 
    private _jwtHelper: JwtHelperService 
  ) { 
    // Connexion grace au token
    let token: string | null = localStorage.getItem('accessToken')
    let tokenClair
    if (token != null) { tokenClair = this._jwtHelper.decodeToken(token) }
    else { tokenClair = new User() } 
    this.userObs = new BehaviorSubject(tokenClair)

    // abonnement à l’évennement newUser
    this.newUserRegistered.subscribe((u)=>{
      this.userObs = new BehaviorSubject(u)
      // this.refreshUser.emit()
    })
  }

  // TEST MESSAGE
  private messageSubject = new Subject<any>();

  sendMessage(mess:string) {
    this.messageSubject.next(mess)
  }
  clear() {
    this.messageSubject.next('clear');
  }
  onMessage(): Observable<any> {
    return this.messageSubject.asObservable()
  }
  // TEST MESSAGE
  
  login(name:string, password:string): Observable<any> {

    const user$ = this.checkUser(name).pipe(
      (u:any)=>{
        console.log(u)
        return u
      // if (u.length != 0) {
      //   if (password == u[0].password) {
      //     let logUser = new User(
      //       u[0].username,
      //       u[0].name,
      //       u[0].avatar,
      //       u[0].email,
      //       u[0].roles
      //     )
      //     this.userObs = new BehaviorSubject(logUser)
      //     return this.userObs.asObservable()
      //   } else {
      //     console.log('mauvais mot de passe');
      //     const err = new Error("mauvais mot de passe")
      //     return this.userObs.asObservable();
      //     // throw throwError(()=>{
      //     //   const err = new Error("mauvais mot de passe")
      //     //   return err
      //     // })
      //   }
      // } else {
      //   console.log('util non trouvé');
      //   const err = new Error("cet utilisateur n’existe pas")
      //   return this.userObs.asObservable();
      //   // throw throwError(()=>{
      //   //   const err = new Error("cet utilisateur n’existe pas")
      //   //   return err
      //   // }) 
      // }
    })
    return user$
  }

  disconnect() {
    let logUser = new User()
    localStorage.removeItem('accessToken');
    this.userObs = new BehaviorSubject(logUser)
    this.refreshUser.emit()
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
