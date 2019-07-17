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
		// delete req.body.image
		newImage.set({
			title: req.body.title,
			subtitle: req.body.subtitle,
			caption: req.body.caption,
			location: req.body.location,
			linkUrl: req.body.linkUrl,
			textColor: req.body.textColor,
			customColor: req.body.customColor,
			textPlacement: req.body.textPlacement,
			active: false,
		})
		newImage.save((err, doc) => {
			if (err) return res.status(500).send(err)
			res.json(doc)
		})
	},
}
