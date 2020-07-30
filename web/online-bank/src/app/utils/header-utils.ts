const DASHBOARD = [
    { name: 'Profile', path: '', focusElement: '' },
    { name: 'Sign out', path: '', focusElement: '' }
];

const LANDING_PAGE = [
    { name: 'Checking', path: 'dashboard', focusElement: '' },
    { name: 'Savings', path: 'dashboard', focusElement: '' },
    { name: 'Investments', path: 'dashboard', focusElement: '' },
    { name: 'Sign in', path: 'login/signin', focusElement: '' },
    { name: 'Sign up', path: 'login/signup', focusElement: '' }
];

export function getHeaderItems(page) {
    switch (page) {
        case 'dashboard':
            return DASHBOARD;
        case 'landing-page':
            return LANDING_PAGE;
        default:
            return [];
    }
}