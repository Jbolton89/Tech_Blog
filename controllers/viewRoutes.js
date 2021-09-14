const router = require('express').Router();
const {
  Posts,
  Users,
  Comments,
} = require('../models');
// const Comments = require('../models/Comments');
// const Posts = require('../models/Posts');
// const Users = require('../models/Users');
const withAuth = require('../utils/auth');

// All posts and JOIN with user and comment
router.get('/', async (req, res) => {
  try {
    const mainPosts = await Posts.findAll({
      include: [{
          model: Users,
          attributes: ['name'],
        },
        {
          model: Comments,
          attributes: ['comment'],
        },
      ]
    });

    const posts = mainPosts.map((post) => post.get({
      plain: true
    }));
    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// Login routes
// If logged in - then redirects to another route 
router.get('/login', (req, res) => { 
  if (req.session.logged_in) { 
    res.redirect('./dashboard');
    return; 
  }
  res.render('login');
});





router.get("/signup", async (req, res) => { 
  res.render("signup");
});

router.get("/post", async (req, res) => { 
  res.render("newpost");
}); 

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Users,
          attributes: ['name'],
        },
        {
          model: Comments,
          include: [
            {
              model: Users,
            },
          ],
        },
      ],
    });
    const post = postData.get({ plain: true });

    console.log('POST =', post);

    res.render('post', {
      ...post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Find user by Session ID
router.get('/dashboard', withAuth, async (req, res) => { 
  try { 
    const mainUsers = await Posts.findByPk(req.params.id, { 
      attributes: { include: ['name'], exclude: ['password'] },
      include: [{ model: Posts }],
    });

    const user = mainUsers.get ({ plain: true });

    res.render('dashboard', { 
      ...user, 
      logged_in: req.session.logged_in, 
    }); 
  } catch (err) { res.status(500).json(err) }
}); 

router.get("/dashboard/:id", async (req, res) => { 
  try { 
    const singlePost = await Post.findByPk(req.params.id, { 
      include: [ 
        { 
          model: Comments, 
          attributes: ["comment", "user_id"],
          include: [
            { 
              model: Users, 
              attributes: ["username"],
            },
          ],
        },
      ]}
      )
    } catch (err) { res.status(500).json(err)
    }
  }
  );












router.get('/', async (req, res) => {
  try {
    res.render('dashboard');
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/', async (req, res) => {
  try {
    const PostData = await Post.findByPk(req.params.id, {
      include: [{
        model: User,
        attributes: ['name'],
      }, ],
    });

    const posts = allPosts.map((post.get({
      plain: true
    })));

    res.render('dashboard', {
      ...posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('./dashboard');
    return;
  }
  res.render('login');
});

// // Use withAuth middleware to prevent access to route
// router.get('/profile', withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password'] },
//       include: [{ model: Project }],
//     });

//     const user = userData.get({ plain: true });

//     res.render('profile', {
//       ...user,
//       logged_in: true
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get('/login', (req, res) => {
//   // If the user is already logged in, redirect the request to another route
//   if (req.session.logged_in) {
//     res.redirect('/profile');
//     return;
//   }

//   res.render('login');
// });

module.exports = router;