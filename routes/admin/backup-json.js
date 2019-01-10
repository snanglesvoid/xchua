const keystone = require('keystone')
const async = require('async')
const fs = require('fs')

const lists = [
    'Artist',
    'Artwork',
    'ArtworkSeries',
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
    'Textsnippet'
    // 'User'
]

exports = module.exports = (req, res) => {
    let result = {}
    async.each(lists, (list, cb) => {
        keystone.list(list).model.find()
            .exec((err, docs) => {
                if (err) return cb(err)
                result[list] = docs
                cb()
            })
    }, err => {
        if (!err) res.json(result)
        else res.status(500).send(err)
    })
}