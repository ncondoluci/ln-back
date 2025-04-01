import { Router } from "express";
import { AccountController } from "../controllers/accountsController.js";
import { flagChecker, tagChecker } from "../middlewares/tagChecker.js";
import { createAccountService } from "../factories/accountServiceFactory.js";

const accountService = await createAccountService();
const accountController = new AccountController(accountService);

const router = Router();
router.get("/getByTag", tagChecker, accountController.getAccountsByTag);
router.get("/getByFlag", flagChecker, accountController.getAccountsByFlag);

export default router;
