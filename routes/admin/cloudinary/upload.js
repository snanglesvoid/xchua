const cloudinary = require('cloudinary')
const keystone = require('keystone')

exports = module.exports = async (req, res) => {
	let files = req.files['upload']
	let list = req.body.list
	let id = req.body.id
	let path = req.body.path

	if (files && files.path) {
		let options = {}

		cloudinary.uploader.upload(
			files.path,
			async function(result) {
				console.log('cloudinary returned', result)
				if (result.error) {
					return res.status(500).send(result.error.message)
				} else {
					try {
						let model = await keystone.list(list).model.findById(id)
						if (!model) return res.status(404).send('error model not found')
						doc[path] = result
						await doc.save()
						res.json(doc)
					} catch (error) {
						return res.status(500).send(error)
					}
				}
			},
			options
		)
	} else {
		res.status(400).send('No File Sent!')
	}
}
