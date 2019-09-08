const keystone = require('keystone')

exports = module.exports = (req, res) => {
	keystone
		.list('Fair')
		.model.find({ state: 'published' })
		.populate('artists')
		.sort('-date.start')
		.exec((err, docs) => {
			if (err) {
				return res.status(500).send(err)
			}
			res.json(docs)
		})
}
