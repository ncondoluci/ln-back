import { Account } from '../interfaces/accountInterface.js';
import { normalizeString } from '../utils/normalizeString.js';

export class AccountService {
    private constructor(private repository: Account[]) {}
  
    static async create(repository: Account[]): Promise<AccountService> {
      return new AccountService(repository);
    }

    async getAccountsByTag(tag: string): Promise<Account[]> {
        // Elimina cualquier simbolo, tilde o numero
        tag = normalizeString(tag);
        
        try {
            // Filtra solo por coincidencias con el valor de "tag"
            const filteredAcc = this.repository.filter(item =>
            (item.tags[0]?.name ?? '')
                .replaceAll(' ', '')
                .toLowerCase() === tag.replaceAll(' ', '').toLowerCase()
            );

            // Adapta la información al View Model
            

        } catch (error) {
          console.error('Error al filtrar cuentas por tag:', error);
          return [];
        }
    }
      

    getAccountByFlag( flag: string): Account[] {
        return [];
    }
}