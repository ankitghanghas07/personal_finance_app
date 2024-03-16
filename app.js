const express = require('express');
const rateLimitMiddleware = require('./middlewares/rateLimiter');

const app = express();

app.use(rateLimitMiddleware);

app.use(express.json());
app.use(express.urlencoded({extended : true}));

const authRoutes = require('./routes/auth.routes');
const transactionRoutes = require('./routes/transaction.routes');

app.use(authRoutes);
app.use(transactionRoutes);

app.listen(3000);