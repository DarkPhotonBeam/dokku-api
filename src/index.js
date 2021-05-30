require('dotenv').config();
const app = require('express')();
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const auth = require('../middleware/auth');
const execAsync = require('../lib/execAsync');

app.use(bodyParser.json());

app.use(auth);

app.get('/apps/list', async (req, res) => {
    try {
        const response = await execAsync('dokku --quiet apps:list');
        const appList = response.split('\n');
        res.status(200).json({apps: appList});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

app.get('/ps/inspect', async (req, res) => {
    try {
        const response = await execAsync(`dokku ps:inspect ${req.query.app}`);
        //const data = JSON.parse(response);
        res.status(200).json({data: response});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

app.listen(port, () => {
    console.log(`Server started listening on port ${port}.`);
});