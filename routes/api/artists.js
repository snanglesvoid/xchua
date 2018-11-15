const keystone = require('keystone')
const Artist = keystone.list('Artist').model

exports = module.exports = {
    get: (req, res) => {
        Artist.find().exec((err, docs) => {
            if (err) {
                return res.status(500).send(err)
            }
            res.json(docs)
        })
    }
}