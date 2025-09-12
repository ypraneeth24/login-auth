const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // setup your MongoDB connection here
const authRoutes = require('./routes/authRoutes');
const passport = require('./config/passport');
dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use('/auth', require('./routes/authRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
