const keystone = require('keystone')

exports = module.exports = async (req, res) => {
    try {
        let docs = await keystone.list('Exhibition').model.find({ state: 'published' })
            .populate('artists')
            .populate('artworks')
            .populate('location')
            .sort('-date.start')

        res.json(docs)
    }
    catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
}