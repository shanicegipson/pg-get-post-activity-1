const express = require('express');
const bodyParser = require ('body-parser');

const app = express();
const PORT = 5000;

const bookRouter = require('./routes/books.router');

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended:true}));
app.use(bodyParser.json());


app.use('/all-books', bookRouter);

app.listen(PORT, () => {
    console.log('listening on port', PORT);
});