import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import expenseRoutes from './routes/expenseRoutes.js';


const app = express();

app.use(cors());

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/finLoggerReact')

.then(() => console.log('Connected to MongoDB'))

.catch(error => console.error('Error connecting to MongoDB:', error));

app.use('/expenses', expenseRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});


