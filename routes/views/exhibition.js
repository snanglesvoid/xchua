const keystone = require('keystone')
const async = require('async')

exports = module.exports = (req, res) => {
    const view = new keystone.View(req, res)
    const locals = res.locals

    locals.section = 'exhibition'

    const query = keystone.list('Exhibition').model.findOne({
        slug: req.params.slug
    })
    .populate('artists')
    .populate('artworks')
    .populate('location')

    view.on('init', next => {
        query.exec((err, doc) => {
            if (err) {
                return next(err)
            }
            if (!doc) {
                return next('not found')
            }
            async.each(doc.artworks, (w, cb) => {
                w.populate('artist', cb)
            }, err => {
                locals.exhibition = doc
                next(err)
            })
        })
    })

    view.render('exhibition')
}