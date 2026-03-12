const express = require('express');
const morgan = require('morgan');

const formRoutes = require('./routes/form.routes');
const publicRoutes = require('./routes/public.routes');
const { notFound, errorHandler } = require('./middlewares/error.middleware');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/forms', formRoutes);
app.use('/api/public/forms', publicRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
