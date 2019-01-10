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


    view.on('init', next => {
        query.exec((err, exs) => {
            if (err) return next(err)
            let exhibitions = {
                upcoming: {
                    berlin: [],
                    beijing: [],
                    indices: []
                },
                current: {
                    berlin: [],
                    beijing: [],
                    indices: []
                },
                past: {
                    berlin: [],
                    beijing: [],
                    indices: []
                }
            }
            let today = new Date()
            exs.forEach(ex => {
                if (ex.date.start > today) {
                    exhibitions.upcoming[ex.location.location.english.toLowerCase()].push(ex)
                }
                else if (ex.date.end < today) {
                    exhibitions.past[ex.location.location.english.toLowerCase()].push(ex)
                }
                else {
                    exhibitions.current[ex.location.location.english.toLowerCase()].push(ex)
                }
            })
            exhibitions.upcoming.indices = Array.apply(null, {
                length: Math.max(exhibitions.upcoming.berlin.length, exhibitions.upcoming.beijing.length)
            }).map(Number.call, Number)
            exhibitions.current.indices = Array.apply(null, {
                length: Math.max(exhibitions.current.berlin.length, exhibitions.current.beijing.length)
            }).map(Number.call, Number)
            exhibitions.past.indices = Array.apply(null, {
                length: Math.max(exhibitions.past.berlin.length, exhibitions.past.beijing.length)
            }).map(Number.call, Number)

            locals.exhibitions = exhibitions
            next()
        })
    })

    view.render('exhibitions')
}