// implement your posts router here
const express = require('express') //<<<importing express

const router = express.Router() //<<<setting up router for expess


router.get('/', (req, res) => {
    res.json("foo")
})

router.get('/:id', (req, res) => {
    
})

router.post('/', (req, res) => {
    
})

router.delete('/:id', (req, res) => {
    
})

router.put('/:id', (req, res) => {
    
})

router.get('/:id/messages', (req, res) => {
    
})


module.exports = router //<<<simply exporting the router
