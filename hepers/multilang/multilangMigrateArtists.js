const mongoose = require('mongoose')
const async    = require('async')

mongoose.Promise = global.Promise

mongoose.set('debug', true)

const uri = 'mongodb://localhost:27017/xc-hua'
const options = { useMongoClient:true }

mongoose.connect(uri, options, async err => {
    let conn = mongoose.connection
    let artists = await conn.db.collection('artists').find().toArray()
    async.each(artists, async (artist, next) => {
        let name = artist.name
        let biography = artist.biography
        if (name.english) return next()
        let res = await conn.db.collection('artists').update({_id : artist._id}, {
            $set: {
                name : { english: name, chinese: name },
                biography : { english: biography },
            }
        })
        next()
    }, err => {
        if (err) console.error(err)
        mongoose.disconnect()
    })
})
