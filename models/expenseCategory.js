import mongoose from "mongoose";

const expenseCategorySchema = new mongoose.Schema({
    _id: String,
    name: String
}, { collection: 'expense_categories'});

const ExpenseCategory = mongoose.model('ExpenseCategory', expenseCategorySchema);


export default ExpenseCategory;