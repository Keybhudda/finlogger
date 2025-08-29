import request from 'supertest';
import express from 'express';
import { expect } from 'chai';
import { createExpense, updateExpense, deleteExpense, getExpenses, getExpenseSummary } from '../../controllers/expenseController.js';
import Expense from '../../models/expense.js';
import ExpenseCategory from '../../models/expenseCategory.js';
import '../test_helper.js';

//Create test server
const app = express();
app.use(express.json());

//Add routes for contoller functions
app.post('/expenses', createExpense);
app.put('/expenses/:id', updateExpense);
app.delete('/expenses/:id', deleteExpense);
app.get('/expenses', getExpenses);
app.get('/expense-summary', getExpenseSummary);

//Test suite for Expense Controller
describe('Expense Controller', () => {
    //Test cases

    //Test for create expense API Success functionality
    it('should create an expense', async () => {
        //Arrange: Create a category for the expense
        const category = await ExpenseCategory.create({_id: "EDUCATION", name: 'Education' });
        //Act: Call Expense API
        const res = await request(app)
        .post('/expenses')
        .send({
            user_id: 'USER_2',
            description: 'Fees',
            amount: 70,
            date: '2020-07-08',
            categoryName: 'Education'
        });
        //Assert: Validate API response
        expect(res.status).to.equal(201);//Check status code is 201
        //Check response body contains id property
        expect(res.body).to.have.property('id');
        //Check the message in the response body
        expect(res.body.message).to.equal('Expense created successfully.');
    });
    //Test for creating expense API validation functionality
    it('should return 400 if required validation fails', async () => {
        //Arrange: create a category for the expense
        const category = await ExpenseCategory.create({ _id: "HOUSING", name: 'Housing' });
        //Act: Call Expense API with the 'description' field missing
        const res = await request(app)
        .post('/expenses')
        .send({
            user_id: "USER_2",
            amount: 100,
            date: '2020-07-01',
            categoryName: 'Housing'
        });
        //Assert: Validate API response
        expect(res.status).to.equal(400);//Check status code is 400 
        //Check error message in the response body
        expect(res.body.error).to.equal('Validation failed.');
    });

    //Test for updating expense API success functionality 
    it('should update an expense', async () => {
        //Arrange: Create category and expense for initial setup 
       const category = await ExpenseCategory.create({ _id: "TRANSPORT", name: 'Transport' });

       const expense = await Expense.create({
            user_id: 'USER_2',
            description: 'Bus',
            amount: 5,
            date: '2020-07-08',
            category_id: 'TRANSPORT'
       });
        //Act: Call update expense API with description, amount, and date fields updated
        const res = await request(app)
        .put(`/expenses/${expense._id}`)
        .send({
            description: 'Train',
            amount: 15,
            date: '2020-07-09',
            categoryName: 'Transport'
        });
        //Assert: Validate API response
        expect(res.status).to.equal(200);//Check status code is 200
        //Checks the message in the response body
        expect(res.body.message).to.equal('Expense updated successfully.');
    });

    //Test fpr update Expense API when the expense to be updated is not found
    it('should return 404 if expense to be updated is not found', async () => {
        //Arrange: Create a category for the expense
        const category = await ExpenseCategory.create({ _id: "TRANSPORT", name: 'Transport'});
        //Act: Call update expense API with the incorrect expense id in the URL
        const res = await request(app)
        .put('/expenses/60c72b2f9b1e8c4f8c56ab45')
        .send({
            description: 'Train',
            amount: 15,
            date: '2020-07-09',
            categoryName: 'Transport'
        });
        //Assert: Validate API response
        expect(res.status).to.equal(404); //Check status code is 404
        expect(res.body.error).to.equal('Expense not found.');
        //Check error message in the response body
    });

    //Test the delete Expense API 
    it('should delete an expense', async () => {
        //Arrange: Create expense category and expense for the inital setup
        const category = await ExpenseCategory.create({ _id: "ENTERTAINMENT", name: 'Entertainment' });
        const expense = await Expense.create({
            user_id: 'USER_2',
            description: 'Movie',
            amount: 30,
            date: '2020-06-12',
            category_id: 'ENTERTAINMENT'
        });
        //Act: Call delete expense API correct expense id in the URL
        const res = await request(app)
        .delete(`/expenses/${expense._id}`);
        //Assert: Validate API response 
        expect(res.status).to.equal(200);//Check status code is 200
        //Check message in the response body
        expect(res.body.message).to.equal('Expense deleted successfully.');
    });

    //Test for the get expenses API
    it('should fetch expense details', async () => {
        //Arrange: Create expense category and expense for the initial setup 
        const category = await ExpenseCategory.create({ _id: "ENTERTAINMENT", name: 'Entertainment' });
        const expense = await Expense.create({
            user_id: 'USER_2',
            description: 'Movie',
            amount: 30,
            date: '2020-06-12',
            category_id: 'ENTERTAINMENT'
        });
        //Act: Call get expenses API with userId and month parameters
        const res = await request(app)
        .get('/expenses')
        .query({ userId: 'USER_2', month: '06-2020' });
        //Assert: Validate API response
        expect(res.status).to.equal(200);//Check status code is 200
        expect(res.body).to.have.property('totalExpenses');
        //Check response body has totalExpenses
        expect(res.body).to.have.property('expenses');//Check response body has expenses
    });
    
})