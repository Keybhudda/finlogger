import express from 'express';
import * as expenseController from '../controllers/expenseController.js';
import * as expenseCategoryController from '../controllers/expenseCategoryController.js'


const router = express.Router();

router.post('/', expenseController.createExpense);//create expense
router.put('/:id', expenseController.updateExpense); //update expense
router.delete('/:id', expenseController.deleteExpense);//delete expense
router.get('/', expenseController.getExpenses);//get expenses
router.get('/summary', expenseController.getExpenseSummary);//get expense summary
router.get('/categories', expenseCategoryController.getAllExpenseCategories);//get expense categories

export default router;