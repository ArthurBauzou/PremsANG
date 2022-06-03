import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private userObs = new BehaviorSubject<User>(new User)

  constructor(
    private _http: HttpClient, 
    private _jwtHelper: JwtHelperService 
  ) { 
    // Connexion grace au token
    let token: string | null = localStorage.getItem('accessToken')
    let tokenClair
    if (token != null) { tokenClair = this._jwtHelper.decodeToken(token) }
    else { tokenClair = new User() } 
    this.userObs.next(tokenClair)
  }
  
  userChange() {
    return this.userObs.asObservable()
  }

  login(name:string, password:string): Observable<string> {
    let result = new Subject<string>()
    this.checkUser(name).subscribe((u:any) => {
      if (u.length == 0) { result.next('err1') }
      else if (u[0].password != password) { result.next('err2') }
      else {
        result.next('ok')
        let userlogedin = new User(
          u[0].username,
          u[0].name,
          u[0].avatar,
          u[0].email,
          u[0].roles
        )
        this.userObs.next(userlogedin)
        this.simultoken(userlogedin.username)
      }
    })
    return result.asObservable()
  }

  disconnect() {
    localStorage.removeItem('accessToken')
    this.userObs.next(new User)
  }

  // METHODES SUR LA BASE DE DONNÉES
  getAllUsers() {
    return this._http.get("http://localhost:3000/users")
  }
  checkUser(name:string) {
    return this._http.get("http://localhost:3000/users?username="+name.toLowerCase())
  }
  registerUser(newUser: User) {
    return this._http.post('http://localhost:3000/users', newUser)
  }

  simultoken(username: string) {
    let token = ''
    switch(username) {
      case "arthur" : token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFydGh1ciIsIm5hbWUiOiJBcnRodXIiLCJlbWFpbCI6ImFydGh1cmJhdXpvdUBnbWVsLmNvbSIsImF2YXRhciI6Ii4vYXNzZXRzL2ltYWdlcy9hdmF0YXJzL2JsdWJBdmF0YXIuanBnIiwicm9sZXMiOlsiQURNSU4iLCJVU0VSIl19.Js09pGUO_BtippndfzRTc7T6HWLxtsRmGnnsiPVkttU'; break;
      case "gary" : token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImdhcnkiLCJuYW1lIjoiR2FyeSIsImF2YXRhciI6Ii4vYXNzZXRzL2ltYWdlcy9hdmF0YXJzL2dhcnlWYXRhci5wbmciLCJlbWFpbCI6InNlYXNuYWlsNzdAZ21lbC5jb20iLCJyb2xlcyI6WyJVU0VSIl19.au3Ru1ZyOODEppwnGE3gGZ8DRXsS4_fwl7xcfg7LLnw'; break;
    }
    if (token!='') {localStorage.setItem('accessToken', token);}
  }

}
