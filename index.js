// require your server and launch it here
console.log('hello world')

const server = require('./api/server') //<<<importing the server.js file
//into this file to run the server

const PORT = 5000 //<<< making the port

server.listen(PORT, () => {
    console.log('listening on ', PORT)
}) //<<<turing the server on at port 5000
