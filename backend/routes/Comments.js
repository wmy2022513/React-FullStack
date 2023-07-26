const express = require('express');
const router = express.Router();
const { Comments } = require('../models');
const { validateToken } = require('../middlewares/AuthMiddleware')


router.get("/:postId", async(req, res) => {
    const postId = req.params.postId;
    const comments = await Comments.findAll({ where: { PostId: postId} });
    res.json(comments);
    
})

router.post("/", validateToken ,async(req, res) => {
    const comment = req.body;
    const username = req.user.username;
    comment.username = username;
    const NewComments = await Comments.create(comment); 
    //assign the new added comments to a variable, also gives it an ID, thus can deleted immediately after just created
    res.json(NewComments);
    console.log(NewComments.id)//print out to see if id has been given
    //the above added codes are for alllow new added comments can be deleted immediately
})

router.delete('/:commentId', validateToken, async(req,res) => {
    const commentId = req.params.commentId

    await Comments.destroy({
        where: {
            id: commentId,
        },
    })
    
    res.json("DELETED SUCCESSFULLY")

})

module.exports = router