const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const formRoutes = require('./routes/form.routes');
const publicRoutes = require('./routes/public.routes');
const authRoutes = require('./routes/auth.routes');
const { notFound, errorHandler } = require('./middlewares/error.middleware');

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use('/api/auth', authRoutes);app.use('/api/forms', formRoutes);
app.use('/api/public/forms', publicRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
