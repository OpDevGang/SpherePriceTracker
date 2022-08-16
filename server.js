const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.write('<p>Gang</p>')
    res.send('Hello World')
    res.end();
})

function keepAlive() {
    app.listen(3000, () => { console.log('Server is online!')})
}

module.exports = keepAlive