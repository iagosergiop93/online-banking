export function validateEmail(email: string) {
    let expr = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return expr.test(email);
}

export function validateSize(passwd: string, min?: number, max?: number) {
    if(min && passwd.length < min) return false;
    if(max && passwd.length > min) return false;

    return true;
}