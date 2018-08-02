const keystone = require('keystone')

exports = module.exports = (req, res) => {
    const view = new keystone.View(req, res)
    const locals = res.locals

    locals.section = 'artists'

    view.query('artist', keystone.list('Artist').model.findOne({
        slug: req.params.slug
    }))

    view.render('artist')
}