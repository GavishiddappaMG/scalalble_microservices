const express = require('express');
const http = require('http');
const app = express();
const bodyParser = require('body-parser');

const producer = require('./producer');
const consumerRoutes = require('./routes');

// App Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    // req.setTimeout(100000); //10 secs
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Header', 'X-Requested-With, content-type, Authorization');
    res.setTimeout(300000, function () {
        res.status(408).json({ success: false, message: "Request has timed out." })
    });
    next();
});


app.use('/api/v1/notification', producer.saveMessage);
app.use('/api/v1/kafka', consumerRoutes)


// Run the microservice app
app.listen(4000, () => {
    console.log(`server is running on 4000 Port`);
});
