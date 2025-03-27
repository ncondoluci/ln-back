import { Request, Response, NextFunction, RequestHandler } from 'express';
import { createAccountService } from '../factories/accountServiceFactory';

const accountService = await createAccountService();

export class AccountController {
    getAccountsByTag: RequestHandler = async (req, res, next)=> {
        const { tag } = req.query;
        try {
            const accounts = await accountService.getAccountsByTag(tag);
            // console.log(accounts);
            res.status(200).json(accounts);
        } catch (error) {
            console.log(error);
            next(error);    
        }
    }
}