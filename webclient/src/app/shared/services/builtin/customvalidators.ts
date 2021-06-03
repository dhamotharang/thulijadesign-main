import { AbstractControl, FormGroup, ValidatorFn, ValidationErrors } from '@angular/forms';

export function CheckPasswordStrength(control: AbstractControl): 
	{ [key: string]: boolean } | null {

		let password:string = control.value;
		const regex = /[$-/:-?{-~!"^_@`\[\]]/g;
 		const lowerLetters = /[a-z]+/.test(password);
		const upperLetters = /[A-Z]+/.test(password);
		const numbers = /[0-9]+/.test(password);
		const symbols = regex.test(password);
		const flags = [lowerLetters, upperLetters, numbers, symbols];
		let passedMatches:boolean = true;

		for (const flag of flags) {
			if (flag === false) passedMatches = false;
		}
		
		if (!passedMatches) return { strength: true };
		
		return null;
}

export function ComparePassword(controlName: string, 
	matchingControlName: string):ValidatorFn {

		return (formGroup: FormGroup):ValidationErrors => {
		
			const control = formGroup.controls[controlName];
			const matchingControl = formGroup.controls[matchingControlName];
			
			if (matchingControl.errors && !matchingControl.errors.mustmatch) {
				return;
			}
			if (control.value !== matchingControl.value) {
				matchingControl.setErrors({ mustmatch: true });
			} else {
				matchingControl.setErrors(null);
			}

		};

}