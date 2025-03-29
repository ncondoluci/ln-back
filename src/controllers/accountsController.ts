import { RequestHandler } from 'express';
import { createAccountService } from '../factories/accountServiceFactory';
import { normalizeString } from '../utils/normalizeString';

const accountService = await createAccountService();

export class AccountController {
    getAccountsByTag: RequestHandler = async (req, res, next) => {
        const { tag, offset = '0', limit = '4', orderAsc = 'true' } = req.query as Record<string, string>;
        console.log(process.env);

        try {
            const accounts = await accountService.getAccountsVMByTag( tag, limit, offset, orderAsc );
            res.status(200).json(accounts);
        } catch (error) {
            console.log(error);
            next(error);    
        }
    }

    getAccountsByFlag: RequestHandler = async (req, res, next) => {
        const { haveVoucher = 'true', offset = '0', limit = '4', orderDesc = 'true' } = req.query as Record<string, string>; 
        
        try {
            const accounts = await accountService.getAccountByFlag( haveVoucher, limit, offset, orderDesc );
            res.status(200).json(accounts);
        } catch (error) {
            console.log(error);
            next(error);
        }
    } 
}