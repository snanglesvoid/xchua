const mongoose = require('mongoose')
const async = require('async')

mongoose.Promis = global.Promise

mongoose.set('debug', true)
const uri = 'mongodb://localhost:27017/xc-hua'
const options = { useMongoClient: true }

mongoose.connect(uri, options, async err => {
    let conn = mongoose.connection
    let exhibitions = await conn.db.collection('exhibitions').find().toArray()

    async.each(exhibitions, async (ex, cb) => {
        let thumbnail = ex.thumbnail
        if (ex.coverPicture) return cb(null)
        let res = await conn.db.collection('exhibitions').update({_id: ex._id}, {
            $set : {
                thumbnail: null,
                coverPicture: thumbnail
            }
        })
        cb(null)
    }, err => {
        if (err) console.error(err)
        mongoose.disconnect()
    })
})