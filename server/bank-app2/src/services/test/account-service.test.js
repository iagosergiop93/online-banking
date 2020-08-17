const { Account, AccountType } = require('../../entities/Account');
const AccountService = require('../account-service').AccountService;

// Mock logger
const logger = {
    info: (a) => { console.log(a) },
    debug: (a) => { console.log(a) }
}

let accService = AccountService.prototype.Factory(logger);

beforeEach(() => {
    accService = AccountService.prototype.Factory(logger);
});

// Start - Method: matchAccountByUserId -------------------------------------------------

describe('matchAccountByUserId', () => {
    
    const mockGetAccountsByUserId = (id) => {
        return Promise.resolve(
            [   new Account(3, '9876543210', 10, AccountType.CHECKING),
                new Account(2, '9873123312', 20, AccountType.SAVINGS),
                new Account(1, '0123456789', 30, AccountType.SAVINGS),
                new Account(4, '6446754654', 40, AccountType.CHECKING)
            ]
        )
    }
    
    const mockGetAccountsByUserIdThrows = (id) => {
        throw new Error('Some Error');
    }

    test('matchAccountByUserId - matching', () => {
        const accNumber = '0123456789';
        const id = 1;
        accService.getAccountsByUserId = mockGetAccountsByUserId;
        return accService.matchAccountByUserId(accNumber, id).then(res => {
            expect(res).toBe(true);
        });
    });
    
    test('matchAccountByUserId - not matching', () => {
        const accNumber = '9012399999';
        const id = 1;
        accService.getAccountsByUserId = mockGetAccountsByUserId;
        return accService.matchAccountByUserId(accNumber, id).then(res => {
            expect(res).toBe(false);
        });
    });
    
    test('matchAccountByUserId - throws exception', async () => {
        const accNumber = '9012399999';
        const id = 1;
        accService.getAccountsByUserId = mockGetAccountsByUserIdThrows;
    
        expect.assertions(1);
        try {
            await accService.matchAccountByUserId(accNumber, id);
        } catch (error) {
            expect(error.message).toMatch('Some Error');
        }
    
    });

});

// End - Method: matchAccountByUserId -------------------------------------------------


