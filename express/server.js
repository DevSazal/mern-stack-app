const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

// initialize express & port
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// connect MongoDB
const uri = process.env.MONGO_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

// initialize route point
app.use('/api/exercise', require('./routes/exercise'));
app.use('/api/user', require('./routes/user'));

// Run ExpressJS Server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
