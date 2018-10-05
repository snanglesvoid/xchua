const mongoose = require('mongoose')
const async    = require('async')

mongoose.Promise = global.Promise

mongoose.set('debug', true)

const uri = 'mongodb://localhost:27017/xc-hua'
const options = { useMongoClient:true }


mongoose.connect(uri, options, async err => {
    let conn = mongoose.connection
    let gallerySpaces = await conn.db.collection('galleryspaces').find().toArray()

    let berlinId, beijingId
    gallerySpaces.forEach(s => {
        console.log(s)
        if(s.location.english == 'Berlin') {
            berlinId = s._id
        }
        if (s.location.english == 'Beijing') {
            beijingId = s._id
        }
    })

    let exhibitions = await conn.db.collection('exhibitions').find().toArray()

    async.each(exhibitions, async (ex, next) => {
        let location = ex.location == 'Berlin' ? berlinId : beijingId
        let res = await conn.db.collection('exhibitions').update({_id: ex._id}, {
            $set : {
                location : location
            }
        })
    }, err => {
        if (err) console.error(err)
        mongoose.disconnect()
    })
})