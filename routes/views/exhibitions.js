const keystone = require('keystone')

exports = module.exports = (req, res) => {
    const view = new keystone.View(req, res)
    const locals = res.locals

    locals.section = 'exhibitions'

    const query = keystone.list('Exhibition').model.find({
        state: 'published'
    }).sort('sortOrder')

    view.query('exhibitions', query)

    view.render('exhibitions')
}