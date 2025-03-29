import { Account, Benefit, Branch, VMAccountFlaged, VMAccountTagged, VMBenefit } from '../interfaces/accountInterface.js';
import { normalizeString } from '../utils/normalizeString.js';
export class AccountService {
    private constructor(private repository: Account[]) {}
  
    static async create(repository: Account[]): Promise<AccountService> {
      return new AccountService(repository);
    }

    getAccountsVMByTag(tag: string, limit = '4', offset = '0', orderAsc = 'true' ): VMAccountTagged[] {
        tag = normalizeString(tag);
        const offsetNum = Number.parseInt(offset, 10) || 0;
        const limitNum = Number.parseInt(limit, 10) || 4;
        const orderAscBool = orderAsc === "true";

        try {
            const accounts = this.prepareViewModel(tag);

            const sortedAccount = accounts.sort((a, b) => {
                return orderAscBool ? a.location - b.location : b.location - a.location; 
            });

            return sortedAccount.slice(offsetNum, limitNum + offsetNum);
            
        } catch (error) {
          console.error('Error al filtrar cuentas por tag:', error);
          return [];
        }
    }

    getAccountByFlag( flag: string, limit = '4', offset = '0', orderDesc = 'true'  ): VMAccountFlaged[] {
        console.log("Flag:", flag);
        console.log("FlagBool:", !!flag);
        const limitNum = Number.parseInt(limit);
        const offsetNum = Number.parseInt(offset);
        const orderDesBoolNum = orderDesc === "true";
        const accountsFlaged = this.repository.reduce((accounts, account) => {

            if(account.haveVoucher !== !!flag) {
                return accounts;
            }

            accounts.push({
                name: account.name,
                url: `${process.env.LN_BASE_URL}/${account.crmid}`,
                image: account.images[0].url,
            });

            return accounts;
        }, [] as VMAccountFlaged[]);
        
        const sortedAccounts = accountsFlaged.sort((a,b) =>  (orderDesBoolNum ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name)));
        const pagedAccounts = sortedAccounts.slice(offsetNum, limitNum + offsetNum);
        
        return pagedAccounts;
    }   

    prepareViewModel(tag: string) {
        return this.repository.reduce((accountsVM: VMAccountTagged[], account: Account) => {
            // Serializa el valor de la etiqueta
            const accTag = this.normalizeTag(account);

            if (accTag !== tag) {
                return accountsVM;
            }
            
            // Obtiene la información necesaria para construir el view model
            const accURL =  `${process.env.LN_BASE_URL}/${account.crmid}`
            const closestLocation = this.getClosestBranch(account.branches);
            const benefits = this.getHighestBenefitByProgram(account.benefits);

            // Arma el view model que se envía al frontend
            accountsVM.push({
                url: accURL,
                name: account.name,
                location: closestLocation,
                type_benefit: benefits,
                images: account.images[0]
            });

            return accountsVM;
        }, [] as VMAccountTagged[]);
    }

    private normalizeTag(account: Account) {
        return (account.tags[0]?.name ?? '')
            .replaceAll(' ', '')
            .toLowerCase();
    }

    private getClosestBranch( branchs: Branch[] ): number {
        const initialBranch = branchs[0].location;
        return branchs.reduce((min, cur) => Math.min(min, cur.location ), initialBranch);
    }

    private getHighestBenefitByProgram(benefits: Benefit[]): VMBenefit[] {
        // Aplanar la lista de beneficios
        const benefitsVM = benefits.flatMap((benefit) =>
          benefit.program_name.map((program_name) => ({
            program_name,
            value: Number.parseInt(benefit.value) || 0,
          }))
        );
      
        // Calcular el beneficio mayor por cada programa en un objeto { programa: valor }
        const highests = benefitsVM.reduce<Record<string, number>>((acc, { program_name, value }) => {
          const current = acc[program_name] ?? 0;
          if (value > current) {
            acc[program_name] = value;
          }
          return acc;
        }, {});
      
        // Convertir el objeto a un array de { program_name, value }
        return Object.entries(highests).map(([program_name, value]) => ({
          program_name,
          value,
        }));
    }
}