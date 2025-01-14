// implement your posts router here
const express = require('express') //<<<importing express

const Post = require('./posts-model') //<<< this lets you use functions
//like async/await and .then/.catch

const router = express.Router() //<<<setting up router for expess


router.get('/', (req, res) => {
    Post.find() //<<< finding the info
        .then(found => { //<< then doing something with what was found
            res.json(found)
        })
        .catch(err => {
            res.status(500).json({
                message: "The posts information could not be retrieved",
                err: err.message,
                stack: err.stack
            })
        })
})

router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        //<<< setting a variable named 'post' as the id that has been
        // selected in the '/:id' part, the 'Post' is being imported in at the top and is using dot notation to access
        // the posts-model.js functions
        if(!post) { //<< if the post does not exist this is what happens
            res.status(404).json({
                message: "The post with the specified ID does not exist",
            })
        } else {
            res.json(post) //<< if it does exist we are just sending back the post
        }
    } catch (err) {
        res.status(500).json({
            message: "The post information could not be retrieved",
            err: err.message,
            stack: err.stack
        })
    }
    
})

router.post('/', (req, res) => {
    const {title, contents} = req.body //<< this is 'pulling' the title and contents out of the req.body
    if (!title || !contents) {
        res.status(400).json({
            message: 'Please provide title and contents for the post'
        })
    } else {
        Post.insert({title, contents})
            .then(({ id }) => { //<< this came back as an object with an id inside, I just made sure to 
                return Post.findById(id)
            }) //<< because I am doing a return on line 56 I am able to do a whole new .then after the first one
            //that also lets me reuse the same .catch. So in the second .then I am pulling out the new 'post' and 
            //sending back a 201 created status.
            .then(post => {
                res.status(201).json(post)
            })
            .catch(err => {
                res.status(500).json({
                    message: "There was an error while saving the post to the database",
                    err: err.message,
                    stack: err.stack
                })
            })
    }
    
})

router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id) //<< dont forget the await! returing a promise!
        if(!post) {
            res.status(404).json({
                message: "The post with the specified ID does not exist",
            })
        } else {
            await Post.remove(req.params.id) //<< dont forget the await! returing a promise!
            res.json(post)
        }
    } catch (err) {
        res.status(500).json({
            message: "The post could not be removed",
            err: err.message,
            stack: err.stack
        })
    }
    
})

router.put('/:id', (req, res) => {
    const {title, contents} = req.body //<< this is 'pulling' the title and contents out of the req.body
    if (!title || !contents) {
        res.status(400).json({
            message: 'Please provide title and contents for the post'
        })
    } else {
        Post.findById(req.params.id)
            .then(stuff => {
                if(!stuff) {
                    res.status(404).json({
                        message: 'The post with the specified ID does not exist',
                    })
                } else {
                   return Post.update(req.params.id, req.body) //<< super happy path, takes the id and the post body if the ID exists
                }
            })
            .then(data => {
                if (data) { //<< if there is data, and some thing got updated, you need to return another promise
                    return Post.findById(req.params.id)
                }
            })
            .then(post => {
                res.json(post)
            }) 
            //<< this .then is taking whatever comes back from the .update in the super happy path
            .catch(err => {
                res.status(500).json({
                    message: "The posts information could not be retrieved",
                    err: err.message,
                    stack: err.stack
                })
            })
    }
    
})

router.get('/:id/messages', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        //<<< setting a variable named 'post' as the id that has been
        // selected in the '/:id' part, the 'Post' is being imported in at the top and is using dot notation to access
        // the posts-model.js functions
        if(!post) { //<< if the post does not exist this is what happens
            res.status(404).json({
                message: "The post with the specified ID does not exist",
            })
        } else {
            const messages = await Post.findPostComments(req.params.id)
            res.json(messages)

        }        
    } catch (err) {
        res.status(500).json({
            message: "The comments information could not be retrieved",
            err: err.message,
            stack: err.stack
        })
    }
})


module.exports = router //<<<simply exporting the router
