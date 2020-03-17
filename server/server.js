const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql');
const dotenv = require('dotenv');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const schema = require('./gql/Schema');
const authSchema = require('./gql/AuthSchema');

const verifyToken = (req, res, next) => {
  const bearerHeader = req.header['authorization'];

  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1];
    req.token = bearerToken;
    jwt.verify(req.token, process.env.SECRETKEY, (err, authData) => {
      err ? res.sendStatus(403) : next();
    });
  } else {
    res.status(403);
  }
};

dotenv.config();

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(
  '/auth',
  graphqlHTTP({
    schema: authSchema,
    graphiql: process.env.NODE_ENV === 'development'
  })
);
app.use(
  '/api',
  verifyToken,
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'
  })
);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.error(err.message));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
