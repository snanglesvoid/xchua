const keystone = require('keystone')
const Artist = keystone.list('Artist').model

exports = module.exports = {
    get: (req, res) => {
        Artist.findOne({slug: req.params.slug})
            .exec((err, doc) => {
                if (err) {
                    return res.stauts(500).send(err)
                }
                res.json(doc)
            })
    },
    post: (req, res) => {
        Artist.findOne(req.body.artist).exec((err, doc) => {
            if (err) {
                return res.status(500).send(err)
            }
            if (!doc) {
                let artist = new Artist(req.body.artist)
                artist.save(err => {
                    if (err){
                        return res.status(500).send(err)
                    }
                    return res.json({status: 'success', msg: 'inserted new artist into database!'})
                })
            }
            else {
                doc.set(req.body.artist)
                doc.save(err => {
                    if (err) {
                        return res.status(500).send(err)
                    }
                    return res.json({status: 'success', msg: 'updated artist in database!'})
                })
            }
        })
    },
    delete: (req, res) => {
        res.status(500).send({msg: "this feature isn't enabled yet"})
        // Artist.findOne({slug: req.params.slug}).remove()
    }
}