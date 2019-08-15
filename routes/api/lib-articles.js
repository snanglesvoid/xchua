const keystone = require('keystone')

exports = module.exports = (req, res) => {
	keystone
		.list('LibArticle')
		.model.find({ state: 'published' })
		.exec((err, docs) => {
			if (err) {
				return res.status(500).send(err)
			}
			res.json(docs)
		})
}
