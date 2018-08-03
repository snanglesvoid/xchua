const keystone = require('keystone')

exports = module.exports = (req, res) => {
    const view = new keystone.View(req, res)
    const locals = res.locals

    locals.section = 'publications'

    const query = keystone.list('Publication').mode.findOne({
        slug: req.params.slug
    })

    view.query('publication', query)

    view.render('publication')
}