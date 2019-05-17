const keystone = require('keystone')

exports = module.exports = (req, res) => {
    keystone.list('SocialLink').model.find()
        .exec((err, docs) => {
            if (err) return res.status(500).send(err)
            res.json(docs)
        })
}