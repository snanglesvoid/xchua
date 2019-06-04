const keystone = require('keystone')

exports = module.exports = async (req, res) => {
    try {
        let query = keystone.list('Exhibition').model.findOne({
            state: 'published',
            slug: req.params.slug
        })
            .populate('artists')
            .populate('artworks')
            .populate('location')

        console.log('params', req.params)
        if (req.params.artistId) {
            console.log('query where ', req.params.artistId)
            query.where({
                artists: req.params.artistId
            })
        }


        let doc = await query.exec()

        if (!doc) {
            res.status(404).send('not found')
        } else {
            res.json(doc)
        }

    }
    catch (error) {
        res.status(500).send(err)
    }
}