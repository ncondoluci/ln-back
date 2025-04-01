import { RequestHandler } from "express";
import { AppError } from "../utils/appError.js";
import { AccountService } from "../services/accountService.js";

export class AccountController {
  private accountService: AccountService;

  constructor(accountService: AccountService) {
    this.accountService = accountService;
  }

  getAccountsByTag: RequestHandler = (req, res, next) => {
    const {
      tag,
      offset = "0",
      limit = "4",
      orderAsc = "true",
    } = req.query as Record<string, string>;

    try {
      const accounts = this.accountService.getAccountsVMByTag(
        tag,
        limit,
        offset,
        orderAsc
      );

      res.status(200).json(accounts);
    } catch (error: any) {
      console.error(`Error en AccountController: ${error}`);

      const appError =
        error instanceof AppError
          ? error
          : new AppError({
              message: error.message || "Error inesperado",
              statusCode: 500,
              isOperational: false,
            });

      next(appError);
    }
  };

  getAccountsByFlag: RequestHandler = (req, res, next) => {
    const {
      haveVoucher = "true",
      offset = "0",
      limit = "4",
      orderDesc = "true",
    } = req.query as Record<string, string>;

    try {
      const accounts = this.accountService.getAccountByFlag(
        haveVoucher,
        limit,
        offset,
        orderDesc
      );

      res.status(200).json(accounts);
    } catch (error: any) {
      console.error(`Error en AccountController: ${error}`);

      const appError =
        error instanceof AppError
          ? error
          : new AppError({
              message: error.message || "Error inesperado",
              statusCode: 500,
              isOperational: false,
            });

      next(appError);
    }
  };
}
