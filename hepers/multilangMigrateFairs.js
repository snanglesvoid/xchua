const mongoose = require('mongoose')
const async    = require('async')

mongoose.Promise = global.Promise

mongoose.set('debug', true)

const uri = 'mongodb://localhost:27017/xc-hua'
const options = { useMongoClient:true }

mongoose.connect(uri, options, async err => {
    let conn = mongoose.connection
    let fairs = await conn.db.collection('fairs').find().toArray()
    async.each(fairs, async (fair, next) => {
        
        let title = fair.title
        if (title.english) return next()
        let res = await conn.db.collection('fairs').update({_id : fair._id}, {
            $set: {
                title: { english: title }
            }
        })
        next()
    }, err => {
        if (err) console.error(err)
        mongoose.disconnect()
    })
})
