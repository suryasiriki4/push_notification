const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Set static path

app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json());

const publicVapidKey = 'BHgtB9klKhhMaURVBMkl6nlHJzBFDUAky5oRbtE6lu9ccLZblnffRZK_RO9mNMdpVmaaKMutO_LDwvSSQYd-mt0';
const privateVapidKey = 'UjyfZLvtrM3ErAjLevTJRwwJ4oJgXc8mn-cXI0i1BfA';

webpush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey);

// subscribe route
app.post('/subscribe', (req, res) => {
    // get push subscription object
    const subscription = req.body;

    //send 201 - resource created

    res.status(201).json({});

    //create payload
    const payload = JSON.stringify({ title: 'Push Test'});

    // Pass object into send notifications
    webpush.sendNotification(subscription, payload)
        .catch(err => console.error(err));
});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
