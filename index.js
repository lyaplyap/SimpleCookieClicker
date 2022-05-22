const express = require('express');
const path = require('path');
const favicon = require('express-favicon');

const config = require('./config');
const PORT = config.port;

const app = express();
app.use(favicon(__dirname + '/client/build/favicon.ico'));
app.use(express.json({ extended: true }));

app.use('/', express.static(path.join(__dirname, 'client', 'build')))
app.get('/*', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})

app.post('/eat-cookie', (request, response) => {

    const { id, cookies } = request.body;
    const cookie = cookies.find(cookie => cookie.id === id);

    const ip = request.headers['x-forwarded-for'] || request.socket.remoteAddress;
    console.log(`User ${ip} clicked on the ${cookie.id} cookie ${cookie.count + 1} times!`);
    
    response.end('See You Space Cowboy...');
});

const start = () => {
    try {
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));
    }
    catch (error) {
        console.log('Server Error', error.message);
        process.exit(1);
    }
}

start();