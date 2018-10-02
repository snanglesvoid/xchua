const mongoose = require('mongoose')
const async    = require('async')

mongoose.Promise = global.Promise

mongoose.set('debug', true)

const uri = 'mongodb://localhost:27017/xc-hua'
const options = { useMongoClient:true }

mongoose.connect(uri, options, async err => {
    let conn = mongoose.connection
    let ps = await conn.db.collection('publications').find().toArray()
    async.each(ps, async (p, next) => {
        
        let title = p.title
        let description = p.description
    
        if (title.english) return next()
        let res = await conn.db.collection('publications').update({_id : p._id}, {
            $set: {
                title:   { english: title   },
                description: { english: description }
            }
        })
        next()
    }, err => {
        if (err) console.error(err)
        mongoose.disconnect()
    })
})
