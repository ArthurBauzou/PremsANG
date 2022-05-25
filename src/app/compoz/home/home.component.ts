import { Component, OnInit } from '@angular/core';
// import { JwtHelperService } from '@auth0/angular-jwt';
// import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  users: User[] = [];

  constructor(
    // private _jwtHelper: JwtHelperService,
    // private _authServ: AuthService,
    private _usersServ: UsersService
  ) { }

  ngOnInit(): void {
    // this.getTokenDecoded(this._authServ.token)
    this.getUsers()
  }
  
  getUsers() {
    this._usersServ.getAllUsers().subscribe({
      next: (u:any)=> this.users = u,
      error: (err)=> console.log(err),
      complete: ()=> {}
    })
  }

  // PARTIE POUR DECODER LES TOKENS (OLD)
  // user:any = {
  //   firstname: '',
  //   lastname: '',
  //   roles: [],
  //   email: ''
  // }
  // getTokenDecoded(token:any) {
  //   let tokenClair = this._jwtHelper.decodeToken(token)
  //   this.user.firstname = tokenClair.firstname;
  //   this.user.roles = tokenClair.roles;
  // }

}
