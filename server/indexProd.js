const app = require('./appProd');


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('server is working at ' + port);
});