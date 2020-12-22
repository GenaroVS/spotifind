const express = require('express');
const app = express();
const allowCrossOrigin = require('./middleware/allowCrossOrigin');

app.use(allowCrossOrigin);
app.use(express.json());
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../public')));
}

app.get('/hello', (req, res) => {
  res.send('helloworld').end();
});


module.exports = app;