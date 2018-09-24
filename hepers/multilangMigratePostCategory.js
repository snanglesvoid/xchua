const mongoose = require('mongoose')
const async    = require('async')

mongoose.Promise = global.Promise

mongoose.set('debug', true)

const uri = 'mongodb://localhost:27017/xc-hua'
const options = { useMongoClient:true }

mongoose.connect(uri, options, async err => {
    let conn = mongoose.connection
    let pcs = await conn.db.collection('postcategories').find().toArray()
    async.each(pcs, async (pc, next) => {
        
        let title = pc.title
    
        if (title.english) return next()
        let res = await conn.db.collection('postcategories').update({_id : pc._id}, {
            $set: {
                title:   { english: title   },
            }
        })
        next()
    }, err => {
        if (err) console.error(err)
        mongoose.disconnect()
    })
})
