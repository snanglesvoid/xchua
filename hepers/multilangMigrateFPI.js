const mongoose = require('mongoose')
const async    = require('async')

mongoose.Promise = global.Promise

mongoose.set('debug', true)

const uri = 'mongodb://localhost:27017/xc-hua'
const options = { useMongoClient:true }

mongoose.connect(uri, options, async err => {
    let conn = mongoose.connection
    let fpis = await conn.db.collection('frontpageimages').find().toArray()
    async.each(fpis, async (fpi, next) => {
        
        let title = fpi.title
        let caption = fpi.caption
        if (title.english) return next()
        let res = await conn.db.collection('frontpageimages').update({_id : fpi._id}, {
            $set: {
                title:   { english: title   },
                caption: { english: caption }
            }
        })
        next()
    }, err => {
        if (err) console.error(err)
        mongoose.disconnect()
    })
})
