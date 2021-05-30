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
        const res = await execAsync('dokku --quiet apps:list');
        const appList = res.split('\n');
        res.status(200).json({apps: appList});
    } catch (error) {
        res.status(500).json({error});
    }
});

app.get('/ps/inspect', async (req, res) => {
    try {
        const res = await execAsync(`dokku ps:inspect ${req.params.app}`);
        const appList = res.split('\n');
        res.status(200).json({apps: appList});
    } catch (error) {
        res.status(500).json({error});
    }
});

app.listen(port, () => {
    console.log(`Server started listening on port ${port}.`);
});