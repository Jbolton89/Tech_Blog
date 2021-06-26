const router = require('express').Router();
const {
  Post,
  User,
  Comment
} = require('../models');
const Comments = require('../models/Comments');
const Users = require('../models/Users');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const mainPosts = await Post.findAll({
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