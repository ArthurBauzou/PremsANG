import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidatorsDirective, passwordConfirm } from 'src/app/shared/customValidators.directive';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit {

  subForm = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('[\\w]+')
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

  constructor() { }

  ngOnInit(): void {
  }

  register() {
    console.log(this.subForm.value)
  }

}
