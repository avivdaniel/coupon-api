const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const generateRandomCodeCupon = require('./../public/utils/generateRandomCodeCupon.js')

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
});

app.put('/coupon', (req, res) => {
    db.collection('coupons').insertOne({
        code: generateRandomCodeCupon(),
        date: new Date().toDateString,
        isRedeen: false
    }, (err, newCupon) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        res.sendStatus(201);
    });
});

app.get('/coupon', (req, res) => {
    db.collection('coupons').find().toArray((err, cupons) => {
        if (err) {
            console.log(err);
            res.send(404);
        }
        res.json(cupons);
    });
});

app.get('/coupon/:id', (req, res) => {
    db.collection('coupons').findOne({
        _id: ObjectId(req.params.id)
    }, (err, foundedCoupon) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        res.json(foundedCoupon);
    });
});

app.listen(3000, () => {
    console.log('cupon app listning now to port 3000!');
});