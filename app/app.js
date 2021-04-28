if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const cors = require('cors');
const routes = require('../routes/index');
const errHandler = require('../middlewares/error_handler');

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(routes);
app.use(errHandler);

app.listen(PORT, () => console.log('listening at port', PORT));

module.exports = app;
