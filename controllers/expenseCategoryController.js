import ExpenseCategory from "../models/expenseCategory.js";

//get AllExpenseCategories() function
export const getAllExpenseCategories = (req, res) => {
    //Fetch all expense categories
    ExpenseCategory.find({}, 'name')
    .then(categories => {
        //Extract category names from categories array
        const categoryNames = categories.map(category => category.name);
        //Return status code 200 with category names
        res.status(200).json({ categories: categoryNames });
    })
    .catch(error => {
        //Return status code 500 with error message
        console.error("Error fetching expense categories:", error);
        res.status(500).json({ error: "Server error." });
    });
};