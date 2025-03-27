import { Request, Response, NextFunction, RequestHandler } from 'express';
import { AccountService } from '../services/accountService.js';

const accountService = new AccountService();

export class AccountController {
    getAccountsByTag: RequestHandler = async (req, res, next)=> {
        const { tag } = req.query;
        console.log(tag)
        try {
            const accounts = await accountService.getAccountsByTag('');
            // console.log(accounts);
            res.status(200).json(accounts);
        } catch (error) {
            console.log(error);
            next(error);    
        }
    }
}