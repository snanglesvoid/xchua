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
            if (err) {
                return next(err || 'artist not found')
            }
            if (!artist) {
                next('not found')
                return view.render('errors/404')
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
                    q: keystone.list('ArtworkSeries').model.find({ artist: artist._id })
                        .populate('artworks')
                        .populate('selectedWork'),
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
                locals.artist.loneWorks = locals.artist.works.filter(w => 
                    locals.artist.series
                        .map(s => !s.artworks.find(x => x._id.equals(w._id)))
                        .reduce((a, b) => a && b, true)
                )
                locals.artist.series = locals.artist.series.filter(s => {
                    console.log(s.artworks.length)
                    return s.artworks.length > 0
                })
                next(err)
            })
        })
    })

    view.render('artist')
}