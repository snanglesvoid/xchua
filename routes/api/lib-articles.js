const keystone = require('keystone')

exports = module.exports = async (req, res) => {
	try {
		let rows = await keystone.list('ShelfRow').model.find()
		let items = await keystone
			.list('LibArticle')
			.model.find({ state: 'published' })
		let result = rows.map(x => {
			return {
				items: items.filter(y => y.row.equals(x._id)),
				height: x.height,
			}
		})
		res.json(result)
	} catch (error) {
		res.status(500).send(error)
	}
	// keystone
	// 	.list('LibArticle')
	// 	.model.find({ state: 'published' })
	// 	.exec((err, docs) => {
	// 		if (err) {
	// 			return res.status(500).send(err)
	// 		}
	// 		res.json(docs)
	// 	})
}
