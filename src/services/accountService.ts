import { Account } from '../interfaces/accountInterface.js';
import { findAllAccounts } from '../repositories/jsonAccountRepository.js';

export class AccountService {
    private accounts: Promise<Account[]>;
     constructor(){
        this.accounts = findAllAccounts();
    }
    async getAccountsByTag( tag: string ): Promise<Account[]> {
        try {
            const accounts = await findAllAccounts();
            return accounts;
        } catch (error) {
            return [];
        }        
    }

    getAccountByFlag( flag: string): Account[] {
        return [];
    }
}