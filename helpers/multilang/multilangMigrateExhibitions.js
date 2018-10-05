const mongoose = require('mongoose')
const async    = require('async')

mongoose.Promise = global.Promise

mongoose.set('debug', true)

const uri = 'mongodb://localhost:27017/xc-hua'
const options = { useMongoClient:true }

mongoose.connect(uri, options, async err => {
    let conn = mongoose.connection
    let exhibitions = await conn.db.collection('exhibitions').find().toArray()
    async.each(exhibitions, async (ex, next) => {
        
        let title = ex.title
        let text  = ex.text
        if (title.english) return next()
        let res = await conn.db.collection('exhibitions').update({_id : ex._id}, {
            $set: {
                title: { english: title },
                text:  { english: text  }
            }
        })
        next()
    }, err => {
        if (err) console.error(err)
        mongoose.disconnect()
    })
})
