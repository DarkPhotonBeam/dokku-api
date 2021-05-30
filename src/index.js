require('dotenv').config();
const app = require('express')();
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const auth = require('../middleware/auth');

app.use(bodyParser.json());

app.use(auth);

app.get('/secret-endpoint', async (req, res) => {
    res.status(200).json({coolData: 'very cool Data'});
});

app.listen(port, () => {
    console.log(`Server started listening on port ${port}.`);
});