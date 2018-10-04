const keystone = require('keystone')

exports = module.exports = (req, res) => {
    const view = new keystone.View(req, res)
    const locals = res.locals

    locals.section = 'fair'

    const query = keystone.list('Fair').model.findOne({
        slug: req.params.slug
    })

    view.query('fair', query)

    view.render('fair')
}