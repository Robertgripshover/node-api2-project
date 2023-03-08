// implement your server here
// require your posts router and connect it here

const express = require('express') //<<<importing express into the server

const postsRouter = require('./posts/posts-router') //<<<importing the
// posts-router information into the server.js file

const server = express() //<<<hooking express up into the server

server.use(express.json()) //<<<telling express how to read json, pretty much required

server.use('/api/posts', postsRouter)

server.use('*', (req, res) => {
    res.status(404).json({
        message: 'not found'
    })
})

module.exports = server //<<<exporting the server out into the rest of the applicaiton
