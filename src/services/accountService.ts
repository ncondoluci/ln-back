import {
  Account,
  VMAccountFlaged,
  VMAccountTagged,
} from "../interfaces/accountInterface.js";
import { prepareViewModel } from "../utils/account.js";
import { normalizeString } from "../utils/normalizeString.js";

export class AccountService {
  private constructor(private repository: Account[]) {}

  static async create(repository: Account[]): Promise<AccountService> {
    return new AccountService(repository);
  }

  getAccountsVMByTag(
    tag: string,
    limit = "4",
    offset = "0",
    orderAsc = "true"
  ): VMAccountTagged[] {
    tag = normalizeString(tag);
    const offsetNum = Number.parseInt(offset, 10) || 0;
    const limitNum = Number.parseInt(limit, 10) || 4;
    const orderAscBool = orderAsc === "true";

    try {
      const accounts = prepareViewModel(this.repository, {
        tag,
        limitNum,
        offsetNum,
        orderAscBool,
      });

      return accounts;
    } catch (error) {
      console.error("Error al filtrar cuentas por tag:", error);
      return [];
    }
  }

  getAccountByFlag(
    flag: string,
    limit = "4",
    offset = "0",
    orderDesc = "true"
  ): VMAccountFlaged[] {
    const limitNum = Number.parseInt(limit);
    const offsetNum = Number.parseInt(offset);
    const accountsFlaged = this.repository.reduce((accounts, account) => {
      if (account.haveVoucher !== (flag === "true")) {
        return accounts;
      }
      // Prepara el view model para el enviar al frontend
      accounts.push({
        name: account.name,
        url: `${process.env.LN_BASE_URL}/${account.crmid}`,
        image: account.images[0].url,
      });

      return accounts;
    }, [] as VMAccountFlaged[]);

    // Ordenar alfabéticamente
    const sortedAccounts = accountsFlaged.sort((a, b) =>
      orderDesc === "true"
        ? b.name.localeCompare(a.name)
        : a.name.localeCompare(b.name)
    );

    const pagedAccounts = sortedAccounts.slice(offsetNum, limitNum + offsetNum);

    return pagedAccounts;
  }
}
