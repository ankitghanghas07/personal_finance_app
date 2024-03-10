const express = require('express');
const router = express.Router();

const checkAuthStatusMiddleware = require('../middlewares/checkAuth');
const transactionController = require('../controller/transaction.controller');

router.get('/transactions', checkAuthStatusMiddleware, transactionController.getTransactions);

router.post('/transactions', checkAuthStatusMiddleware, transactionController.addTransaction);

router.get('/transactions/summary', checkAuthStatusMiddleware, transactionController.getSummary);

router.delete('/transactions/:id', checkAuthStatusMiddleware, transactionController.deleteTransaction);

module.exports = router;