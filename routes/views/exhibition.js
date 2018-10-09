const keystone = require('keystone')

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

    view.query('exhibition', query)

    view.render('exhibition')
}