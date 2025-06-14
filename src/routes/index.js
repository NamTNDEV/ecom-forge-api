const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const productRoutes = require('./product');

router.use('/v0/api/hello', (req, res) => {
  res.status(200).json({ message: 'Hello, ExpressJS! 🐍🐍🐍 ' });
});
router.use('/v1/api', authRoutes);
router.use('/v1/api', productRoutes);

module.exports = router;
