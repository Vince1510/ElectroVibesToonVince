import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import phoneRoutes from './routes/phoneRoutes.js'; 
import laptopRoutes from './routes/laptopRoutes.js'; 
import keyboardRoutes from './routes/keyboardRoutes.js'; 

// Express app
const app = express();

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/phones', phoneRoutes);
app.use('/api/laptop', laptopRoutes);
app.use('/api/keyboards', keyboardRoutes);

// Connect to the database
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // Listen for requests
    app.listen(process.env.PORT, () => {
      console.log(`Connected to db & listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });