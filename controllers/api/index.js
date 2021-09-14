const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes')
// const projectRoutes = require('./projectRoutes');

router.use('/users', userRoutes);
router.use('./posts', postRoutes)
// router.use('/projects', projectRoutes);

module.exports = router;