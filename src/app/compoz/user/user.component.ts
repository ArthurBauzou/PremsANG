import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('logwin') logwin!: ElementRef;
  @ViewChild('profwin') profwin!: ElementRef;

  constructor(
    private _usersServ: UsersService
  ) { }
  
  ngOnInit(): void {
    this.getUser()
    this._usersServ.refreshUser.subscribe(() => this.getUser())
  }

  getUser() {
    this._usersServ.getCurrentUser().subscribe(
      (u) => this.user = u
    )
  }

  // TEST
  testMessages(mess:any) {
    let remove: boolean = (mess.value.password != '')
    remove ? this._usersServ.clear() : this._usersServ.sendMessage(mess.value.name)
  }
  // TEST

  logUser(loginfo:any) {
    this.errMsg1 = ""
    this.errMsg2 = ""
    let nm = loginfo.value.name
    let pwd = loginfo.value.password
    if (nm != '' && pwd != '') {
      this._usersServ.login(nm, pwd).subscribe(
        (u:User[]) => {
          this.user = u[0]
          
          // <simultoken
          let token = ''
          switch(this.user.username) {
            case "arthur" : token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFydGh1ciIsIm5hbWUiOiJBcnRodXIiLCJlbWFpbCI6ImFydGh1cmJhdXpvdUBnbWVsLmNvbSIsImF2YXRhciI6Ii4vYXNzZXRzL2ltYWdlcy9hdmF0YXJzL2JsdWJBdmF0YXIuanBnIiwicm9sZXMiOlsiQURNSU4iLCJVU0VSIl19.Js09pGUO_BtippndfzRTc7T6HWLxtsRmGnnsiPVkttU'; break;
            case "gary" : token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImdhcnkiLCJuYW1lIjoiR2FyeSIsImF2YXRhciI6Ii4vYXNzZXRzL2ltYWdlcy9hdmF0YXJzL2dhcnlWYXRhci5wbmciLCJlbWFpbCI6InNlYXNuYWlsNzdAZ21lbC5jb20iLCJyb2xlcyI6WyJVU0VSIl19.au3Ru1ZyOODEppwnGE3gGZ8DRXsS4_fwl7xcfg7LLnw'; break;
          }
          if (token!='') {localStorage.setItem('accessToken', token);}
          // simultoken>

        },
        (err:any) => console.log(err)
      );
      // this.getUser();

      // this._usersServ.login(nm, pwd).subscribe({
      //   next: (u: User) => {
      //     this.user = u
      //     console.log('salut on est dans next');
      //     this.logwin.nativeElement.classList.add('hidd')
      //     // <simultoken
      //     // let token = ''
      //     // switch(this.user.username) {
      //     //   case "arthur" : token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFydGh1ciIsIm5hbWUiOiJBcnRodXIiLCJlbWFpbCI6ImFydGh1cmJhdXpvdUBnbWVsLmNvbSIsImF2YXRhciI6Ii4vYXNzZXRzL2ltYWdlcy9hdmF0YXJzL2JsdWJBdmF0YXIuanBnIiwicm9sZXMiOlsiQURNSU4iLCJVU0VSIl19.Js09pGUO_BtippndfzRTc7T6HWLxtsRmGnnsiPVkttU'; break;
      //     //   case "gary" : token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImdhcnkiLCJuYW1lIjoiR2FyeSIsImF2YXRhciI6Ii4vYXNzZXRzL2ltYWdlcy9hdmF0YXJzL2dhcnlWYXRhci5wbmciLCJlbWFpbCI6InNlYXNuYWlsNzdAZ21lbC5jb20iLCJyb2xlcyI6WyJVU0VSIl19.au3Ru1ZyOODEppwnGE3gGZ8DRXsS4_fwl7xcfg7LLnw'; break;
      //     // }
      //     // if (token!='') {localStorage.setItem('accessToken', token);}
      //     // simultoken>
      //   },
      //   error: (err:any) => console.log(err),
      //   continue: () => console.log('on est dans continue')
        
      // })
    }
    else { this.errMsg2 = "veuillez renseigner les champs" }
  }

  disconnect() {
    this._usersServ.disconnect();
    this.profwin.nativeElement.classList.add('hidd');
  }

}
