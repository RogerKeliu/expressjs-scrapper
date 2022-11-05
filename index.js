const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const programmingLanguagesRouter = require('./src/routes/programmingLanguages.route');
const instagramRouter = require('./src/routes/instagram.route');
const idealistaRouter = require('./src/routes/idealista.route');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) => {
  res.json({'message': 'ok'});
})

app.use('/programming-languages', programmingLanguagesRouter);
app.use('/instagram', instagramRouter);
app.use('/idealista', idealistaRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});
  
  return;
});

app.listen(port, '0.0.0.0', () => {
  console.log(process.env.DB_HOST)
  console.log(`Example app listening at http://localhost:${port}`)
});
