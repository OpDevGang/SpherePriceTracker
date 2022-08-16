const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World')
})

//function keepAlive() {
app.listen(3000, () => { console.log('Server is online!')})
//}

//module.exports = keepAlive;