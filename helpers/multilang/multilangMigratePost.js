const mongoose = require('mongoose')
const async    = require('async')

mongoose.Promise = global.Promise

mongoose.set('debug', true)

const uri = 'mongodb://localhost:27017/xc-hua'
const options = { useMongoClient:true }

mongoose.connect(uri, options, async err => {
    let conn = mongoose.connection
    let posts = await conn.db.collection('posts').find().toArray()
    async.each(posts, async (post, next) => {
        
        let title = post.title
        let content = post.content

        console.log('post title: ',  title)
        console.log('post content ex: ', content != null)
        console.log('post content en: ', content.english != null)

        if (false) return next()
        let res = await conn.db.collection('posts').update({_id : post._id}, {
            $set: {
                // title:   { english: title   },
                content: { english: {
                    brief: content.brief,
                    extended: content.extended
                } }
            }
        })
        next()
    }, err => {
        if (err) console.error(err)
        mongoose.disconnect()
    })
})
