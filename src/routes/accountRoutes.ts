import { Router } from 'express';
import { AccountController } from '../controllers/accountsController.js';
import { tagChecker } from '../middlewares/tagChecker';

const router = Router();

const accountController = new AccountController();
router.get('/getByTag', tagChecker, accountController.getAccountsByTag);

router.get('/', [/* Middlewares */], (req, res, next) => res.json({success: true}));

export default router;