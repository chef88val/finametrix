const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const mongoose = require("mongoose");

  require("dotenv").config({ path: `${process.env.NODE_ENV}.env` });

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));

//Settings
app.set('port', process.env.PORT || 3000)

//Middlewares
app.use(morgan('dev'));
app.disable('etag');
//CORS
app.use(cors());
//app.use(cors({ origin: 'http://localhost:4200' }));
//Express
app.use(express.json());


//Routes
app.use('/api', require('./src/routes/index'));

//Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});
