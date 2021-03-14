// Add module dependencies
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const mkdirp = require('mkdirp');
mkdirp.sync('./uploads');

// Add custom dependencies
const config = require('./config/config');
const routes = require('./routes/routes');

// Init dbConnection
let dbUrl;
let dbConf = {
    "hostname" : config.MONGO.hostname,
    "port" : config.MONGO.port,
    "username" :  config.MONGO.username,
    "password" : config.MONGO.password,
    "replicaSet": config.MONGO.replicaSet,
    "dbName": config.MONGO.dbName
};
if(dbConf.username != '' || dbConf.password != ''){
    dbUrl = `mongodb://${dbConf.username}:${dbConf.password}@${dbConf.hostname}:${dbConf.port}/${dbConf.dbName}`;
    if(dbConf.replicaSet){
        dbUrl += `?replicaSet=${dbConf.replicaSet}`;
    }
    mongoose.connect(dbUrl, { 
        "auth" : { "authSource": "admin" },
        "useNewUrlParser" : true, 
        "useUnifiedTopology": true,
        'useCreateIndex': true
    });
    
}else{
    dbUrl = `mongodb://${dbConf.hostname}:${dbConf.port}/${dbConf.dbName}`;
    mongoose.connect(dbUrl, { 
        "useNewUrlParser" : true, 
        "useUnifiedTopology" : true,
        'useCreateIndex': true,
    });
}
mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB Successfully.");
});
mongoose.connection.on('connected', () => {
    console.log('MongoDB connected');
});
mongoose.connection.on('disconnected', () => {
    console.error("Mongodb is disconnected");
});
mongoose.connection.on('reconnected', () => {
    console.log('MongoDB reconnected');
});
mongoose.connection.on('error', (error) => {
    console.log('MongoDB error :: ' + error);
});

// App Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    req.setTimeout(100000); //10 secs
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Header', 'X-Requested-With, content-type, Authorization');
    res.setTimeout(300000,function(){
        res.status(408).json({success:false, message:"Request has timed out."})
    });
    next();
});
app.use(cors());
app.use(helmet.noCache())
app.use(helmet.xssFilter());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());

// Add service routes
 app.use(config.API_BASE, routes);

// Hanlde uncaughtExceptions here to prevent termination
process.on('uncaughtException', function(error) {
    console.log("uncaughtException :: ", error);
    console.error((new Date).toUTCString() + ' uncaughtException Message :: ', error.message);
});

// Run the microservice app
app.listen(config.PORT, () => {
	console.log(`${config.APP_NAME} is running on ${config.PORT} Port`);
});