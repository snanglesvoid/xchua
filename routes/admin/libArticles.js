const keystone = require('keystone')

exports = module.exports = {
	get: (req, res) => {
		res.status(500).send('not implemented')
	},
	post: async (req, res) => {
		let article
		if (req.body._id) {
			article = await keystone.list('LibArticle').model.findById(req.body._id)
			if (!article) return res.status(400).send('saving unknown item')
			article.set(req.body)
			article.save((err, doc) => {
				if (err) return res.status(500).send(err)
				res.json(doc)
			})
		} else {
			let LibArticle = keystone.list('LibArticle').model
			article = new LibArticle()
			article.set(req.body)
			article.save((err, doc) => {
				if (err) return res.status(500).send(err)
				res.json(doc)
			})
		}
	},
}
