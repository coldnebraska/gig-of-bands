const router = require('express').Router();
const { Gigs, Bands, Venues } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const gigData = await Gigs.findAll()

    const events = gigData.map((gig) => gig.get({ plain: true }))

    res.render('homepage', { 
      events,
      logged_in: req.session.logged_in
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/myprofile', withAuth, async (req, res) => {
  try {
    const accountType = req.session.account

    if (accountType == 'band') {
      // Find the logged in user based on the session ID
      const userData = await Bands.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Gigs }],
      })
  
      const band = userData.get({ plain: true })
  
      res.render('profile', {
        band,
        myprofile: true,
        logged_in: true
      })
    } else {
      // Find the logged in user based on the session ID
      const userData = await Venues.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Gigs }],
      })
  
      const venue = userData.get({ plain: true })
  
      res.render('profile', {
        venue,
        myprofile: true,
        logged_in: true
      })
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/bandprofile/:id', async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await Bands.findByPk(req.params.id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Gigs }],
    })

    const band = userData.get({ plain: true })

    res.render('profile', {
      band,
      logged_in: req.session.logged_in
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/venueprofile/:id', async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await Venues.findByPk(req.params.id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Gigs }],
    })

    const venue = userData.get({ plain: true })

    res.render('profile', {
      venue,
      logged_in: req.session.logged_in
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/eventprofile/:id', async (req, res) => {
  try {
    const userData = await Gigs.findByPk(req.params.id)

    const gig = userData.get({ plain: true })

    res.render('profile', {
      gig,
      logged_in: req.session.logged_in
    })
  } catch (err) {
    res.status(500).json(err)
    console.log(err)
  }
})

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/myprofile');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

module.exports = router;
