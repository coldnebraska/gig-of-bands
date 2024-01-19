const router = require('express').Router();
const userRoutes = require('./userRoutes');
const performerRoutes = require('./performerRoutes');
const venueRoutes = require('./venueRoutes');
const gigRoutes = require('./gigRoutes');

router.use('/users', userRoutes);
router.use('/performers', performerRoutes);
router.use('/venues', venueRoutes);
router.use('/gigs', gigRoutes);

module.exports = router;
