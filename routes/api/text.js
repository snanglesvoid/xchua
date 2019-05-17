const keystone = require('keystone')

exports = module.exports = async (req, res) => {
    try {
        let data = await keystone.list('Textblock').model.findOne({ slug: req.params.slug })
        if (!data) {
            return res.status(404).send('not found')
        }
        res.json(data)
    }
    catch(error) {
        res.status(500).send(error)
    }
}