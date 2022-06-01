import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { passwordConfirm, userNameBan } from 'src/app/shared/customValidators.directive';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit {

  usernameBanList: string[] = [];

  subForm = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('[\\w]+'),
      userNameBan(this.usernameBanList)
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.maxLength(30),
      Validators.pattern('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}')
    ]),
    confirmPassword: new FormControl(null, [
      Validators.required,
      Validators.maxLength(30),
      Validators.pattern('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}')
    ]),
    email: new FormControl(null, [
      Validators.required,
      Validators.email
    ]),
    avatar: new FormControl()
  }, { validators: passwordConfirm })

  constructor(private _usersService: UsersService, private _router: Router,) { }

  ngOnInit(): void {
  }

  register() {
    let username = this.subForm.value.name.toLowerCase()
    this._usersService.checkUser(username).subscribe((d:any) => {
      if (d.length != 0) {
        this.subForm.controls['name'].setErrors({'incorrect': true})
        this.usernameBanList.push(username)
        this.subForm.controls['name'].updateValueAndValidity();
      } else {
        let newUser: User = this.subForm.value
        if (!newUser.avatar) {
          newUser.avatar = `./assets/images/avatars/avatDefault0${Math.ceil(Math.random() * 4)}.jpg`
        }
        newUser.username = username
        newUser.roles = []
        newUser.roles.push("user")
        this._usersService.registerUser(newUser).subscribe({
          next: () => console.log("utilisateur enregistré : ", newUser),
          error: (err) => console.log("il y a eu une erreur omg", err),
          complete: () => { this._router.navigate(['']) }
        })
      }
    })
  }

}
