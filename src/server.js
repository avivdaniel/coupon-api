const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const generateRandomCodeCupon = require('../public/utils/generateRandomCodeCupon.js');

app.use(express.static('public'));

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
        date: new Date(),
        isRedeen: false
    }, (err, newCupon) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        res.json(newCupon.ops[0]);
    });
});

app.get('/coupon', (req, res) => {
    db.collection('coupons').find().toArray((err, cupons) => {
        if (err) {
            console.log(err);
            res.send(400);
        }
        res.json(cupons);
    });
});

app.get('/coupon/:id', (req, res) => {
    const couponId = ObjectId(req.params.id);
    db.collection('coupons').findOne({
        _id: couponId
    }, (err, foundedCoupon) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        res.json(foundedCoupon);
    });
});

app.post('/coupon/:id', (req, res) => {
    const couponId = ObjectId(req.params.id);
    db.collection('coupons').findOneAndUpdate(
        { _id: couponId },
        { $set: { code: generateRandomCodeCupon(), date: new Date() } },
        { returnNewDocument: true },
        (err, updatedCoupon) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            }
            if (updatedCoupon.value === null) {
                res.sendStatus(404);
                return;
            }
            res.sendStatus(200);
        }
    );
});


app.post('/coupon/:id/redeem', (req, res) => {
    const couponId = ObjectId(req.params.id);
    db.collection('coupons').findOneAndUpdate(
        { _id: couponId },
        { $set: { isRedeen: true } },
        { returnNewDocument: true },
        (err, updatedCoupon) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            }
            if (updatedCoupon.value === null) {
                res.sendStatus(404);
                return;
            }
            res.sendStatus(200);
        }
    );
});

app.delete('/coupon/:id', (req, res) => {
    const couponId = ObjectId(req.params.id);
    db.collection('coupons').findOneAndDelete(
        {
            _id: couponId
        }, (err, report) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            }
            if (report.value === null) {
                res.sendStatus(404);
                return;
            }
            res.sendStatus(204);
        }
    );
});



app.listen(3000, () => {
    console.log('cupon app listning now to port 3000!');
});