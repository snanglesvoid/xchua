const keystone = require('keystone')

exports = module.exports = {
    get: (req, res) => {
        const query = keystone.list('Artwork').model.find()

        if (req.params.artistId) {
            query.where({ artist: req.params.artistId })
        }
       
        query.exec((err, docs) => {
                if (err) {
                    return res.status(500).send(err)
                }
                return res.json(docs)
            })
    }
}