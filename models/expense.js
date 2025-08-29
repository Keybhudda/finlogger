import mongoose from "mongoose";


const expenseSchema = new mongoose.Schema({
    user_id: { type: String, required: true},
    description: { type: String, required: true},
    amount: { type: Number, required:true},
    date: { type: Date, required: true, default: Date.now },
    category_id: { type: String, ref:"ExpenseCategory",required: true },
});

const Expense = mongoose.model('Expense', expenseSchema);

export default Expense;

