const keystone = require('keystone')

exports = module.exports = {
	get: (req, res) => {
		keystone
			.list('FrontPageImage')
			.model.find()
			.sort('listPriority')
			.exec((err, docs) => {
				if (err) return res.status(500).send(err)
				res.json(docs)
			})
	},
	post: async (req, res) => {
		let image
		console.log('post ', req.body)
		if (req.body._id) {
			let image = await keystone
				.list('FrontPageImage')
				.model.findById(req.body._id)
			if (!image) return res.status(400).send('saving unknown item')
			image.set({
				title: req.body.title,
				subtitle: req.body.subtitle,
				caption: req.body.caption,
				location: req.body.location,
				linkUrl: req.body.linkUrl,
				textColor: req.body.textColor,
				customColor: req.body.customColor,
				textPlacement: req.body.textPlacement,
				image: req.body.image,
			})
			image.save((err, doc) => {
				if (err) return res.status(500).send(err)
				res.json(doc)
			})
		} else {
			let FrontPageImage = keystone.list('FrontPageImage').model
			image = new FrontPageImage()
			image.set({
				title: req.body.title,
				subtitle: req.body.subtitle,
				caption: req.body.caption,
				location: req.body.location,
				linkUrl: req.body.linkUrl,
				textColor: req.body.textColor,
				customColor: req.body.customColor,
				textPlacement: req.body.textPlacement,
				image: req.body.image,
				active: false,
			})
			image.save((err, doc) => {
				if (err) return res.status(500).send(err)
				res.json(doc)
			})
		}

		// delete req.body.image
	},
	delete: (req, res) => {
		let id = req.params.id
		keystone
			.list('FrontPageImage')
			.model.findByIdAndRemove(id)
			.exec((err, _) => {
				if (err) return res.status(500).send(err)
				res.json(_)
			})
	},
	updateOrder: (req, res) => {
		let items = req.body
		Promise.all(
			items.map(item => {
				return new Promise((resolve, reject) => {
					keystone
						.list('FrontPageImage')
						.model.findById(item.id)
						.exec((err, doc) => {
							if (err) return reject(err)
							if (!doc) return reject('not found')
							return resolve(doc)
						})
				})
			})
		)
			.then(docs => {
				console.log('docs', docs)
				docs.forEach((doc, i) => {
					doc.listPriority = items[i].listPriority || 0
					doc.active = items[i].active
				})
				return Promise.resolve(docs)
			})
			.then(docs => {
				return Promise.all(
					docs.map(
						doc =>
							new Promise((resolve, reject) => {
								doc.save((err, doc_) => {
									if (err) return reject(err)
									return resolve(doc_)
								})
							})
					)
				)
			})
			.then(docs => {
				res.json(docs)
			})
			.catch(error => {
				console.error(error)
				res.status(500).send(error)
			})
	},
}
