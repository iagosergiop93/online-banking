import { Router } from '@angular/router';

export function whichPageLogin(router: Router) {
    const url = router.url.toLowerCase();
    let page = '';
    if(url.indexOf('signin') !== -1) {
        page = 'signin';
    }
    else {
        page = 'signup';
    }

    return page;
}

export function userLoggedInCallback(router: Router) {
    router.navigate(['/dashboard']);
}

export function getLoginLinks(page: string): any[] {
    let links = [];
    if(page === 'signin') {
        links = [
            { text: 'Forgot your password?', path: '' },
            { text: 'Still don\'t have and account', path: '/login/signup' },
        ];
    }
    else {
        links = [
            { text: 'Already have an account? Sign in', path: '/login/signin' }
        ];
    }
    return links;
}
