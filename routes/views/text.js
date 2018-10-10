const keystone = require('keystone')

exports = module.exports = (req, res) => {
    const view = new keystone.View(req, res)

    view.query('data', keystone.list('Textblock').model.findOne({
        slug: req.params.slug
    }))

    view.render('text')
}