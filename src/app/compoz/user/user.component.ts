import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  errMsg1: string = '';
  errMsg2: string = '';
  user = new User()
  userAbo: Subscription;

  @ViewChild('logwin') logwin!: ElementRef;
  @ViewChild('profwin') profwin!: ElementRef;

  constructor(
    private _usersServ: UsersService
  ) {
    this.userAbo = this._usersServ.userChange().subscribe((u)=>this.user=u)
   }
  
  ngOnInit(): void { }

  logUser(loginfo:any) {
    let nm = loginfo.value.name
    let pwd = loginfo.value.password
    if (nm == '' || pwd == '') { this.errMsg2 = "veuillez renseigner les champs" }
    else {
      this._usersServ.login(nm,pwd).subscribe((r)=>{
        switch (r) {
          case "err1" : this.errMsg1 = 'Utilisateur non reconnu'; break;
          case "err2" : this.errMsg2 = 'Mauvais mot de passe'; break;
          case "ok" : this.logwin.nativeElement.classList.add('hidd');
                      this.errMsg1 = '' ; this.errMsg2 = ''; break;
        }
      })
    }
  }

  disconnect() {
    this._usersServ.disconnect();
    this.profwin.nativeElement.classList.add('hidd');
  }

}
