const keystone = require('keystone')

exports = module.exports = async (req, res) => {
    try {
        let doc = await keystone.list('Exhibition').model.findOne({
            state: 'published',
            slug: req.params.slug
        })
            .populate('artists')
            .populate('artworks')
            .populate('location')

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