const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error(err));

// Define Schema and Model
const FormSchema = new mongoose.Schema({
  name: String,
  email: String,
  address: String,
  city: String,
});

const Form = mongoose.model('Form', FormSchema);

// Routes
app.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.post('/submit', async (req, res) => {
  try {
    const formData = new Form(req.body);
    await formData.save();
    res.status(200).json({ message: 'Form data saved successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save form data' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
