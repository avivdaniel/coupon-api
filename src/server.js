const express = require('express');
const app = express();

app.get('/user', (req, res) => {
    res.send('This is the users get page!');
})

app.listen(3000, () => {
    console.log('cupon app listning now to port 3000!');
});