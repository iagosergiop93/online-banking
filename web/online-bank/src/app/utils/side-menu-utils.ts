const SIDEMENU = [
    { name: 'Home', path: '/dashboard/home', focusElement: '' },
    { name: 'Deposit', path: '/dashboard/deposit', focusElement: '' },
    { name: 'Withdraw', path: '/dashboard/withdraw', focusElement: '' },
    { name: 'Transfer', path: '/dashboard/transfer', focusElement: '' },
    { name: 'Profile', path: 'not-impl', focusElement: '' },
    { name: 'Sign out', path: '', focusElement: '' }
];

export function getSideMenu() {
    return SIDEMENU;
}
