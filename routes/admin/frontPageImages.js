const keystone = require('keystone')

exports = module.exports = {
	get: (req, res) => {
		keystone
			.list('FrontPageImage')
			.model.find()
			.sort('-listPriority')
			.exec((err, docs) => {
				if (err) return res.status(500).send(err)
				res.json(docs)
			})
	},
	post: (req, res) => {
		let newImage = new keystone.list('FrontPageImage').model()
		newImage.set(req.body)
		newImage.save((err, doc) => {
			if (err) return res.status(500).send(err)
			res.json(doc)
		})
	},
}
