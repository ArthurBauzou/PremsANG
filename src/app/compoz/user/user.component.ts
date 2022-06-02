import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  errMsg: string = '';
  user = new User('','','','','',[])

  @ViewChild('logwin') logwin!: ElementRef;
  @ViewChild('profwin') profwin!: ElementRef;

  constructor(
    private _jwtHelper: JwtHelperService,
    private _usersServ: UsersService
  ) { }
  
  ngOnInit(): void {
    this._usersServ.getCurrentUser().subscribe(
      (u) => this.user = u
    )
    // let token: string | null = localStorage.getItem('accessToken')
    // if (token != null) {
    //   let tokenClair = this._jwtHelper.decodeToken(token)
    //   console.log(`Y’a un token pour ${tokenClair.name}`)
    //   this._usersServ.checkUser(tokenClair.name).subscribe((u:any) => {
    //     this.user = u[0]
    //     this._usersServ.provideCurrentUser.emit(this.user)
    //   })
    // }
    // this._usersServ.askCurrentUser.subscribe(() => {
    //     console.log('on me demande l’utilisateur, je renvoie ', this.user)
    //     this._usersServ.provideCurrentUser.emit(this.user)
    //   }
    // )
  }

  logUser(loginfo:any) {
    this.errMsg = ""
    let nm = loginfo.value.name
    let pwd = loginfo.value.password
    if (nm != '' || pwd != '') {
      this._usersServ.checkUser(nm).subscribe((u: any) => {
          if (u.length != 0) {
            if (pwd == u[0].password) {
              this.user = u[0]
              this._usersServ.provideCurrentUser.emit(this.user)

              // simul token
              if (this.user.username == "arthur") {
                let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFydGh1ciIsIm5hbWUiOiJBcnRodXIiLCJwYXNzd29yZCI6ImxvbHV3aXNoIiwiZW1haWwiOiJhcnRodXJiYXV6b3VAZ21lbC5jb20iLCJhdmF0YXIiOiIuL2Fzc2V0cy9pbWFnZXMvYXZhdGFycy9ibHViQXZhdGFyLmpwZyIsInJvbGVzIjpbIkFETUlOIiwiVVNFUiJdfQ.VsKAR4Ff5w0G26ysJgS5-Bon-5HQJIuQXAedZcZS2Ro';
                localStorage.setItem('accessToken', token);
                console.log("token envoyé", token)
              }

              this.logwin.nativeElement.classList.add('hidd')
            }
            else { this.errMsg = "mauvais mot de passe" }
          }
          else { this.errMsg = "l’utilisateur n’existe pas" }
      });
    }
    else { this.errMsg = "veuillez renseigner les champs" }
  }

  disconnect() {
    this.user = new User('','','','','',[]);
    localStorage.removeItem('accessToken');
    this._usersServ.provideCurrentUser.emit(this.user)
    this.profwin.nativeElement.classList.add('hidd');
  }

}
