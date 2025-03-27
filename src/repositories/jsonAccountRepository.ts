import { readFile } from 'fs/promises';
import { join } from 'path';
import { Account } from '../interfaces/accountInterface.js';

const FILE_PATH = join(process.cwd(), 'src/utils/accounts.json');
type accounts = string;
export async function getAllAccounts(): Promise<Record<accounts, Account[]>> {
  try {
      const data = await readFile(FILE_PATH, 'utf8');
      const parsedData = JSON.parse(data) as Record<accounts, Account[]>;
      return parsedData;
  } catch (error) {
    console.error('Ocurrió un error al leer el archivo:', error);
    return { accounts: [] };
  }
}
