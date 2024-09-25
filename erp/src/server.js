const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/pp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// User schema
const userSchema = new mongoose.Schema({
  Model: String,
  Amazon: Number,
  Flipkart: Number,
  VijaySales: Number,
  Croma: Number,
  Snapdeal: Number,
});

const User = mongoose.model('pps', userSchema);

// Route to get user by Model
app.get('/api/users/:Model', async (req, res) => {
  try {
    const user = await User.findOne({ Model: req.params.Model });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});