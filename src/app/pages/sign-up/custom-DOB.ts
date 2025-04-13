import { AbstractControl, ValidationErrors } from '@angular/forms';

export function minimumAgeValidator(minAge: number) {
  return (control: AbstractControl): ValidationErrors | null => {
    const dob = new Date(control.value);
    const today = new Date();

    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    const dayDiff = today.getDate() - dob.getDate();

    // لو لسه مكملش 18 سنة في نفس السنة
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age >= minAge
      ? null
      : { minimumAge: { requiredAge: minAge, actualAge: age } };
  };
}
