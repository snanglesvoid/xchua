const keystone = require('keystone')
exports = module.exports = async (req, res) => {
    try {
        let docs = await keystone.list('GallerySpace').model.find()
        res.json(docs)
    }
    catch (error) {
        res.status(500).send(error)
    }
}