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
    console.log('caconfirme',control.get('password')?.value, control.get('confirmPassword')?.value)
    const dontmatch = control.get('password')?.value !== control.get('confirmPassword')?.value;
    return dontmatch ? {passwordDontMatch: true} : null
  }

// export function passwordConfirm(pass: string, confpass: string): ValidatorFn {
//   return (control: AbstractControl): ValidationErrors | null => {
//     const dontmatch = pass !== confpass;
//     return dontmatch ? {passwordDontMatch: {value: control.value}} : null
//   }
// }

// return (formGr: FormGroup) => {
//   const control = formGr.controls[pass];
//   const matchControl = formGr.controls[confpass];

//   if (matchControl.errors && !matchControl.errors.passwordConfirm) {
//     return;
//   }

//   if (control.value !== matchControl.value) {
//     matchControl.setErrors({passwordConfirm: true});
//   } else {
//     matchControl.setErrors(null);
//   }
//   return null;
// }