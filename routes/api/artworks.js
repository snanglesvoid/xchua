const keystone = require('keystone')

exports = module.exports = {
    get: (req, res) => {
        keystone.list('Artwork').model.find()
            .populate('artist')
            .exec((err, docs) => {
                if (err) {
                    return res.status(500).send(err)
                }
                return res.json(docs)
            })
    }
}