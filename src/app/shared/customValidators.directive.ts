import { Directive } from '@angular/core';
import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appCustomValidators]'
})
export class CustomValidatorsDirective {
  constructor() { }
}

export const passwordConfirm: ValidatorFn = (control: AbstractControl):
   ValidationErrors | null => {
    const dontmatch = control.get('password')?.value !== control.get('confirmPassword')?.value;
    return dontmatch ? {passwordDontMatch: true} : null
  }

export function userNameBan(list: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const banned = list.includes(control.value?.toLowerCase())
    return banned ? {usernameTaken: true} : null
  }
}