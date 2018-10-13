const express = require('express');
const mongoose = require('mongoose');
const app = express();
const config = require('./config/dev');
const FakeDB = require('./fake-db');
const rentalRouter = require('./routes/rental');
mongoose.connect(config.DB_URL).then(()=>{
  const fakeDb = new FakeDB();
  fakeDb.seedDb();
});
app.use('/api/v1/rentals', rentalRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
  console.log('Im running');
});
