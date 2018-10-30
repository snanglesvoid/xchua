const keystone = require('keystone')
const async = require('async')
const fs = require('fs')

const lists = [
    'Artist',
    'Artwork',
    'Enquiry',
    'Exhibition',
    'Fair',
    'FrontPageImage',
    'Gallery',
    'GallerySpace',
    'Post',
    'PostCategory',
    'Publication',
    'SocialLink',
    'Textblock',
    'User'
]

exports = module.exports = (req, res) => {
    const view = new keystone.View(req, res)
    let locals = res.locals

    view.on('init', next => {
        locals.uploaded = false
        next()
    })

    view.on('post', {action: 'upload'}, next => {
        let backupFile = req.files.backup
        fs.readFile(backupFile.path,'utf8', (err, data)=> {
            // console.log(JSON.parse(data))
            let backup
            try {
                backup = JSON.parse(data)
            } catch (err) {
                return next(err)
            }
            async.eachSeries(Object.keys(backup), (key, cb) => {
                if (key == 'User') return cb()
                let objs = backup[key]
                let list
                try {
                    list = keystone.list(key)
                } catch (err) {
                    return cb(err)
                }
                // console.log(key, list.length)
                async.eachSeries(objs, (obj, cb2) => {
                    list.model.findById(obj._id, (err, doc) => {
                        if (err) {
                            return cb2(err)
                        }
                        else if (doc) {
                            doc.set(obj)
                            doc.save(cb2)
                        }
                        else {
                            new list.model(obj).save(cb2)
                        }
                    })
                }, err => {
                    cb(err)
                })
            }, err => {
                locals.uploaded = err ? false : true
                next(err)
            })
        })
    })
    
    view.render('admin/backup')
}