const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const dotenv = require('dotenv');
const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/', require('./routes'))


mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    }
    else {
        app.listen(port, () => { console.log(`Database is listening and node Running on port ${port}`) })
    }
})

// production error handler
// no stacktraces leaked to user
app.use(function (error, req, res, next) {
    if (res.headersSent) {
      return next(error)
    } else {
      res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR);
      res.send({
        error
      });
    }
  
  });