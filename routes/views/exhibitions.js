const keystone = require('keystone')

exports = module.exports = (req, res) => {
    const view = new keystone.View(req, res)
    const locals = res.locals

    locals.section = 'exhibitions'

    const query = keystone.list('Exhibition').model.find({
        state: 'published'
    })
    .populate('artists')
    .populate('artworks')
    .populate('location')
    .sort('-date.start')

    // view.query('exhibitions', query)

    view.on('init', next => {
        query.exec((err, exs) => {
            if (err) return next(err)
            let exhibitions = {
                upcoming: [],
                current: [],
                past: []
            }
            let today = new Date()
            exs.forEach(ex => {
                if (ex.date.start > today) {
                    exhibitions.upcoming.push(ex)
                }
                else if (ex.date.end < today) {
                    exhibitions.past.push(ex)
                }
                else {
                    exhibitions.current.push(ex)
                }
            })
            locals.exhibitions = exhibitions
            next()
        })
    })

    view.render('exhibitions')
}