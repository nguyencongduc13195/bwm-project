const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();
const config = require('./config/dev');
const FakeDB = require('./fake-db');
const rentalRouter = require('./routes/rental');
const userRouter = require('./routes/user');
mongoose.connect(config.DB_URL,  { useNewUrlParser: true }).then(()=>{
  // const fakeDb = new FakeDB();
  // fakeDb.seedDb();
});
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/v1/rentals', rentalRouter);
app.use('/api/v1/users', userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
  console.log('Im running');
});
