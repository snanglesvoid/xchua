const keystone = require('keystone')
const async = require('async')

exports = module.exports = function(req, res) {
    keystone.list('Exhibition').model.find()
        .exec((err, docs) => {
            if (err) return res.send(err)

            async.each(docs, (doc, cb) => {
                doc.slug = null
                doc.save(cb)
            }, err => {
                return res.send(err || 'ok')
            })
        })
}