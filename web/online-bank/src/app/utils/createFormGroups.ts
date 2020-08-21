import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TransactionType } from '../entities/transaction';

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

export function createTransferTransactionFormGroup() {
    return new FormGroup({
        fromAcc: new FormControl('', [
            Validators.required
        ]),
        toAcc: new FormControl('', [
            Validators.required
        ]),
        value: new FormControl('', [
            Validators.required,
            Validators.min(0.1)
        ])
    });
}

export function formHasErrors(formControls, formType: TransactionType) {
    if(formType === TransactionType.DEPOSIT || formType === TransactionType.WITHDRAW) {
        if(formControls.account.errors || formControls.value.errors) return true;
    }
    else if(formType === TransactionType.TRANSFER) {
        if(formControls.fromAcc.errors || formControls.toAcc.errors || formControls.value.errors) return true;
    }

    return false;
}