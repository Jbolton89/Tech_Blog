const router = require('express').Router();
const { Posts, Users, Comments } = require('../../models');
const Comments = require('../../models/Comments');
// What is withAuth? and why are we not using it in this example? 
router.post('/', async (req, res) => {
    try { 
        const newPost = await Posts.create({ 
            name: req.body.name,
            description: req.body.description, 
            user_id: req.session.user_id 
         });
         res.status(200).json(newPost);
    } catch (err) { 
        res.status(400).json(err);
    }
});

router.post('/:id/comment', async (req, res) => {
    try { 
        const newComment = await Comments.create({ 
            comment: req.body.comment,
            user_id: req.session.user_id,
            post_id: req.params.id 
         });
         res.status(200).json(newComment);
    } catch (err) { 
        res.status(400).json(err);
    }
});

router.get('/', (req, res) => { 
    Posts.findAll({
        include: [{ model:user, attributes: ['name']}]
    })

})