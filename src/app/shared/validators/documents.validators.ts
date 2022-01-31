import { FormArray, FormControl } from '@angular/forms';

export function requireCheckboxesToBeCheckedValidator(minRequired = 1): any {
  return function validate (formArray:FormArray) {
    let checked = 0;

    formArray.controls.forEach( (x: any) => {
      Object.keys(x.controls).forEach(key => {
        const control = x.controls[key];

        if (control.value === true) {
          checked ++;
          }
        });
    })
    if (checked < minRequired) {
      return {
        requireCheckboxesToBeChecked: true,
      };
    }
    return null;
  };
}

