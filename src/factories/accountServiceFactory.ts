import { getAllAccounts } from "../repositories/jsonAccountRepository.js";
import { AccountService } from "../services/accountService.js";

export async function createAccountService(): Promise<AccountService> {
  const { accounts: repo } = await getAllAccounts();
  return AccountService.create(repo);
}
