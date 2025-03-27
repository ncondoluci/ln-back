import { getAllAccounts } from "../repositories/jsonAccountRepository";
import { AccountService } from "../services/accountService";

export async function createAccountService(): Promise<AccountService> {
    const repo = await getAllAccounts();
    return AccountService.create(repo);
}