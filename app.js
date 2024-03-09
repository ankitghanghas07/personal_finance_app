const express = require('express');
// const dotenv = require('dotenv');

const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({extended : true}));

const authRoutes = require('./routes/auth.routes');
const transactionRoutes = require('./routes/transaction.routes');

app.use(authRoutes);
app.use(transactionRoutes);

app.listen(3000);