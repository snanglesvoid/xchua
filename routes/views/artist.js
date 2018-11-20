const keystone = require('keystone')
const async = require('async')

exports = module.exports = (req, res) => {
    const view = new keystone.View(req, res)
    const locals = res.locals

    locals.section = 'artist'

    view.on('init', function(next) {
        keystone.list('Artist').model.findOne({
            slug: req.params.slug
        })
        .exec((err, artist) => {
            if (err || !artist) {
                return next(err || 'artist not found')
            }

            locals.artist = artist

            const queries = [
                {
                    q: keystone.list('Artwork').model.find({
                        artist: artist._id
                    }).sort('sortOrder'),
                    n: 'works'
                }
                ,
                {   
                    q: keystone.list('Exhibition').model.find()
                        .where('artists').in([artist._id])   
                        .populate('artists') 
                        .populate('location')
                        .sort('-date.start'),
                    n: 'exhibitions'
                }
                ,
                {
                    q: keystone.list('ArtworkSeries').model.find({
                        artist: artist._id
                    }),
                    n: 'series'
                }
            ]

            async.each(queries, (query, cb) => {
                // console.log(query.n)
                query.q.exec((err, results) => {
                    // console.log(query.n, results.length)
                    locals.artist[query.n] = results
                    cb(err)
                })
            }, err => {
                // console.log(artist.exhibitions)
                locals.series = {}
                locals.artist.series.forEach(s => {
                    locals.series['ser__' + s.slug] = {
                        works: locals.artist.works.filter(x => {
                            return s._id.equals(x.series)
                        }),
                        series: s
                    }
                })
                locals.artist.works.forEach(x => {
                    if (!x.series) {
                        locals.series['wor__' + x.slug] = x
                    }
                })
                console.log(locals.series)
                next(err)
            })
        })
    })

    view.render('artist')
}