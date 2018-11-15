const keystone = require('keystone')
const Artwork = keystone.list('Artwork').model

exports = module.exports = {
    get: (req, res) => {
        Artwork.findById(req.params.slug)
            .exec((err, doc) => {
                if (err) {
                    return res.status(500).send(err)
                }
                res.json(doc)
            })
    },
    post: (req, res) => {
        let artwork = req.body.artwork
        let Artwork
        Artwork.findOne(artwork)
            .exec((err, doc) => {
                if (err) {
                    return res.status(500).send(err)
                }
                if (!doc) {
                    let w = new Artwork(artwork)
                    w.save(err => {
                        if (err) {
                            return res.status(500).send(err)
                        }
                        res.json({
                            status: 'success',
                            msg: 'inserted document into database!'
                        })
                    })
                }
                else {
                    doc.set(artwork)
                    doc.save(err => {
                        if (err) {
                            return res.status(500).send(err)
                        }
                        res.json({
                            status: 'success',
                            msg: 'update document in database'
                        })
                    })
                }
            })
    },
    delete: (req, res) => {
        res.status(500).send({
            msg: 'this feature is not enabled yet.'
        })
    }
}