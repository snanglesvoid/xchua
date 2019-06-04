const keystone = require('keystone')

exports = module.exports = async (req, res) => {
    try {
        let query = keystone.list('ArtworkSeries').model.find()
            .populate('artworks')
            .populate('selectedWork')

        if (req.params.artistId) {
            query.where({ artist: req.params.artistId })
        }
        let series = await query.exec()
        res.json(series)
    }
    catch (error) {
        res.status(500).send(error)
    }
}