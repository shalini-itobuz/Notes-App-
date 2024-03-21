import express from 'express';
import mongoose from 'mongoose';
import routes from './routes/index.js';
import dotenv from 'dotenv';
import connectDB from './connect.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5500;
app.use(express.json());

// mongoose.connect('mongodb://localhost:27017/notes');

app.use('/api', routes);

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




// get= http://localhost:3000/api/notes
