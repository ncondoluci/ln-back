import { Account } from '../interfaces/accountInterface.js';

export class AccountService {
    private constructor(private repository: Account[]) {}
  
    static async create(repository: Account[]): Promise<AccountService> {
      return new AccountService(repository);
    }

    async getAccountsByTag( tag: string ): Promise<Account[]> {
        try {
            console.log(this.repository);
            return this.repository;
        } catch (error) {
            return [];
        }        
    }

    getAccountByFlag( flag: string): Account[] {
        return [];
    }
}