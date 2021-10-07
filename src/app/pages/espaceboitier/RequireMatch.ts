import { AbstractControl } from '@angular/forms';

export function RequireMatch(control: AbstractControl) {
  const selection: any = control.value;
  console.log(typeof selection+"  "+selection);
  if (typeof selection === 'string') {
    return { incorrect: true };
  }
  return null;
}
