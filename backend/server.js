import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import productRoutes from './routes/productRoutes.js'; 

// Express app
const app = express();

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/products', productRoutes);

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
