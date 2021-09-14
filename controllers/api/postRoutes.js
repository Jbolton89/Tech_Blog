const router = require('express').Router();
const { Posts, Users, Comments } = require('../../models');
const withAuth = require('../../utils/auth');

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

router.delete("/:id", async (req, res) => {
    try {
      const deletePost = await Post.destroy({
        where: { id: req.params.id },
      });
      if (!deletePost) {
        res(404).json({ message: "Nothing found with that ID" });
      }
      res.status(200).json(deletePost);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  

  module.exports = router; 