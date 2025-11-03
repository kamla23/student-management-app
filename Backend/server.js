
import 'dotenv/config';

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import studentRouter from './routes/routes.js';
import Student from './model/model.js';

const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', studentRouter);


const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);

const database = mongoose.connection;

database.on("error", (error) => {
    console.log(error);
})

database.once('connected', () => {
    console.log('Database Connected');
})

app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend is connected!' });
});

app.delete('/api/students', async (req, res) => {
  try {
    await Student.deleteMany({});
    res.status(200).json({ message: 'All students deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => {
    console.log(`Server Started at PORT :${PORT}`)
})
export default app;




