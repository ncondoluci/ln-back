import { Router } from 'express';
import { AccountController } from '../controllers/accountsController.js';
import { flagChecker, tagChecker } from '../middlewares/tagChecker';

const router = Router();

const accountController = new AccountController();
router.get('/getByTag', tagChecker, accountController.getAccountsByTag);

router.get('/getByFlag', flagChecker, accountController.getAccountsByFlag);

export default router;