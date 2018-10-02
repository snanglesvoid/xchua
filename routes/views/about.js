const keystone = require('keystone')

exports = module.exports = (req, res) => {
    const view = new keystone.View(req, res)
    const locals = res.locals

    locals.section = 'about'

    view.query('aboutText', keystone.list('Textblock').model.findOne({
        slug: 'abouttext'
    }))

    view.query('spaces', keystone.list('GallerySpace').model.find({
        published: true
    }))

    view.render('about')
}