const keystone = require('keystone')
const Snippet = keystone.list('Textsnippet').model

exports = module.exports = (req, res) => {
    Snippet.find().exec((err, docs) => {
        if(err) {
            return res.status(500).send(err)
        }
        res.json(docs)
    })
}