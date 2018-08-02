const keystone = require('keystone')

exports = module.exports = (req, res) => {
    const view = new keystone.View(req, res)
    const locals = res.locals

    locals.section = 'artists'

    view.query('artists', keystone.list('Artist').model.find().sort('sortOrder'))

    view.render('artists')
}