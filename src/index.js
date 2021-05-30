require('dotenv').config();
const app = require('express')();
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello There');
});

app.listen(port, () => {
    console.log(`Server started listening on port ${port}.`);
});