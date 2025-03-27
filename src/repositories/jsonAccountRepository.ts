import { readFile } from 'fs/promises';
import { join } from 'path';
import { Account } from '../interfaces/accountInterface.js';

const FILE_PATH = join(process.cwd(), 'src/utils/accounts.json');

export async function findAllAccounts(): Promise<Account[]> {
  try {
      const data = await readFile(FILE_PATH, 'utf8');
      // const parsedData = JSON.parse(data) as Account[];
      return data;
  } catch (error) {
    console.error('Ocurrió un error al leer el archivo:', error);
    return [];
  }
}
