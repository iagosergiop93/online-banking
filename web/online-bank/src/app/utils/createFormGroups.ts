import { FormGroup, FormControl, Validators } from '@angular/forms';

export function createSignInFormGroup(): FormGroup {
    return new FormGroup({
        email: new FormControl('', [
            Validators.required,
            Validators.email,
        ]),
        passwd: new FormControl('', [
            Validators.required,
            Validators.minLength(4)
        ])
    });
}

export function createSignUpFormGroup() {
    return new FormGroup({
        firstName: new FormControl('', [
            Validators.required
        ]),
        lastName: new FormControl('', [
            Validators.required
        ]),
        email: new FormControl('', [
            Validators.required,
            Validators.email,
        ]),
        passwd: new FormControl('', [
            Validators.required,
            Validators.minLength(4)
        ])
    });
}

export function createSimpleTransactionFormGroup() {
    return new FormGroup({
        account: new FormControl('', [
            Validators.required
        ]),
        value: new FormControl('', [
            Validators.required,
            Validators.min(0.1)
        ])
    });
}
