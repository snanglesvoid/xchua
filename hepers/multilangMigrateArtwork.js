const mongoose = require('mongoose')
const async    = require('async')

mongoose.Promise = global.Promise

mongoose.set('debug', true)

const uri = 'mongodb://localhost:27017/xc-hua'
const options = { useMongoClient:true }

mongoose.connect(uri, options, async err => {
    let conn = mongoose.connection
    let artworks = await conn.db.collection('artworks').find().toArray()
    async.each(artworks, async (artwork, next) => {
        
        let description = artwork.description
        let title = artwork.title
        if (title && title.english) return next()
        let res = await conn.db.collection('artworks').update({_id : artwork._id}, {
            $set: {
                description: { english: description },
                title: { english: title }
            }
        })
        next()
    }, err => {
        if (err) console.error(err)
        mongoose.disconnect()
    })
})
