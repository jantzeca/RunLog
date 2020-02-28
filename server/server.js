const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql');
const dotenv = require('dotenv');
const morgan = require('morgan');
const schema = require('./gql/RootQuery');

dotenv.config();

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

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
