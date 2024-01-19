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

module.exports = router
