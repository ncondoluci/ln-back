import { Account, Branch, VMAccountTagged } from '../interfaces/accountInterface.js';
import { normalizeString } from '../utils/normalizeString.js';

export class AccountService {
    private LN_BASE_URL = 'https://club.lanacion.com.ar';
    private constructor(private repository: Account[]) {}
  
    static async create(repository: Account[]): Promise<AccountService> {
      return new AccountService(repository);
    }

    async getAccountsByTag(tag: string): Promise<VMAccountTagged[]> {
        // Elimina cualquier simbolo, tilde o numero
        tag = normalizeString(tag);
        
        try {
            const accounts = this.repository.reduce((accountsVM: VMAccountTagged[], account: Account ) => {
                // Serializa el valor de la etiqueta
                const accTag = (account.tags[0]?.name ?? '')
                    .replaceAll(' ', '')
                    .toLowerCase()

                    // Evalua si la etiqueta de la cuenta coincide con la buscada
                    if(accTag !== tag) {
                        return accountsVM;
                    }
                    const closestLocation = this.getClosestBranch(account.branches);

                    // Arma el view model que se envía al frontend
                    accountsVM.push({
                        url: `${this.LN_BASE_URL}/${account.crmid}`,
                        name: account.name,
                        location: closestLocation,
                        type_benefit: account.benefits[0].type_benefit,
                        images: account.images[0]
                    });

                    return accountsVM
            }, [] as VMAccountTagged[])

            return accounts;
        } catch (error) {
          console.error('Error al filtrar cuentas por tag:', error);
          return [];
        }
    }

    async getAccountByFlag( flag: string) {
        return [];
    }

    getClosestBranch( branchs: Branch[] ): number {
        const initialBranch = branchs[0].location;
        return branchs.reduce((prev, cur) => Math.min(prev, cur.location ), initialBranch);
    }
}