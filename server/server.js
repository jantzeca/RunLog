const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config();

const app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));
app.use(express.json());
app.use(morgan('dev'));

mongoose
  .connect(`mongodb://localhost/runLog`, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.error(err.message));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
