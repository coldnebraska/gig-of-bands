const router = require('express').Router()
const { Gigs, Bands, Venues } = require('../../models')

router.get('/', async (req, res) => {
    try {
        const gigData = await Gigs.findAll({
            include: [{ model: Bands, attributes: { exclude: ['username', 'password']} }, { model: Venues, attributes: { exclude: ['username', 'password']} }]
        })

        const gigs = gigData.map((gig) => gig.get({ plain: true }))
        
        res.status(200).json(gigs)
    } catch(err) {
        res.status(400).json(err)
    }
})

router.post('/search', async (req, res) => {
    try {
        gigData = await Gigs.findAll({
            include: [{model: Bands}, {model: Venues}]
        })

        let id
        gigData.forEach(element => {
            if (req.body.eventBand == element.dataValues.band.name && req.body.eventVenue == element.dataValues.venue.name) {
                id = element.dataValues.id
            }
        })
        res.status(200).json(id)
    } catch (err) {
        res.status(400).json(err)
        console.log(err)
    }
})

router.get('/search/band', async (req, res) => {
    try {
        const gigData = await Gigs.findAll({
            where: {band_id: req.session.user_id},
            include: [{ model: Bands, attributes: { exclude: ['username', 'password']} }, { model: Venues, attributes: { exclude: ['username', 'password']} }]
        })

        const gigs = gigData.map((gig) => gig.get({ plain: true }))
        
        res.status(200).json(gigs)
    } catch(err) {
        res.status(400).json(err)
    }
})

router.get('/search/venue', async (req, res) => {
    try {
        const gigData = await Gigs.findAll({
            where: {venue_id: req.session.user_id},
            include: [{ model: Bands, attributes: { exclude: ['username', 'password']} }, { model: Venues, attributes: { exclude: ['username', 'password']} }]
        })

        const gigs = gigData.map((gig) => gig.get({ plain: true }))
        
        res.status(200).json(gigs)
    } catch(err) {
        res.status(400).json(err)
    }
})

module.exports = router
