const keystone = require('keystone')

exports = module.exports = (req, res) => {
    const view = new keystone.View(req, res)
    const locals = res.locals

    locals.section = 'fairs'

    const query = keystone.list('Fair').model.find({
        state: 'published'
    })
    .populate('artists')
    .sort('-date.start')

    view.query('fairs', query)

    view.render('fairs')
}