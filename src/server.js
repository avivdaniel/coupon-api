const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

//Mongo setup
const client = new MongoClient('mongodb://localhost:27017', { useUnifiedTopology: true });
let db;
client.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }
    db = client.db('cupon-app');
    console.log('connection successful to the cupon-app DB');
})

app.get('/cupon', (req, res) => {
    res.send('This is the users get page!');
});

app.listen(3000, () => {
    console.log('cupon app listning now to port 3000!');
});