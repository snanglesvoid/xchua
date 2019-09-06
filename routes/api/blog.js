const keystone = require('keystone')

exports = module.exports = async (req, res) => {
	try {
		const category = await keystone.list('PostCategory').model.findOne({
			key: req.params.category,
		})
		const posts = await keystone
			.list('Post')
			.model.find({
				state: 'published',
				category: category,
			})
			.sort('publishedDate')
		res.json(posts)
	} catch (err) {
		return res.status(500).send(err)
	}
}
