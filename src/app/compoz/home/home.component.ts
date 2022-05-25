import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private _jwtHelper: JwtHelperService,
    private _authServ: AuthService
  ) { }

  ngOnInit(): void {
    this.getTokenDecoded(this._authServ.token)
  }
  
  user:any = {
    firstname: '',
    lastname: '',
    roles: [],
    email: ''    
  }
  
  getTokenDecoded(token:any) {
    let tokenClair = this._jwtHelper.decodeToken(token)
    console.log(tokenClair)
    this.user.firstname = tokenClair.firstname;
    this.user.roles = tokenClair.roles;
    console.log(this.user.roles)
  }

}
