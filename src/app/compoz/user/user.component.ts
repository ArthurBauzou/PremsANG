import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  showconnect: boolean = false;
  showprofil: boolean = false;
  errMsg: string = '';

  user: User = {
    name: '',
    password: '',
    avatar: '',
    email: '',
    roles: []
  };

  constructor(
    private _usersServ: UsersService
  ) { }

  ngOnInit(): void {
  }

  logUser(loginfo:any) {
    this.errMsg = ""
    let nm = loginfo.value.name
    let pwd = loginfo.value.password
    if (nm != '' || pwd != '') {
      this._usersServ.checkUser(nm).subscribe({
        next: (u:any) => {
          console.log(u)
          if (u.length != 0) {
            if (pwd == u[0].password) {
              this.user = u[0]
            }
            else { this.errMsg = "mauvais mot de passe" }
          }
          else { this.errMsg = "l’utilisateur n’existe pas" }
        }
      });
    }
    else { this.errMsg = "veuillez renseigner les champs" }
  }

}
