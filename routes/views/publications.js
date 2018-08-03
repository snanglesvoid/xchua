const keystone = require('keystone')

exports = module.exports = (req, res) => {
    const view = new keystone.View(req, res)
    const locals = res.locals

    locals.section = 'publications'

    const query = keystone.list('Publication').model.find({
        state: 'published'
    }).sort('sortOrder')

    view.query('publications', query)

    view.render('publications')
}