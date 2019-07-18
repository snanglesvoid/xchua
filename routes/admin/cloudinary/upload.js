const cloudinary = require('cloudinary')
const keystone = require('keystone')

let uploadPromise = function(path, options) {
	return new Promise((resolve, reject) => {
		cloudinary.uploader.upload(
			path,
			result => {
				if (result.error) return reject(error.message)
				return resolve(result)
			},
			options
		)
	})
}

exports = module.exports = async (req, res) => {
	let files = req.files['upload']
	let list = req.body.list
	let id = req.body.id
	let path = req.body.path

	console.log('upload, list = ', list, ', id = ', id, ', path = ', path)

	try {
		let model = await keystone.list(list).model.findById(id)
		if (!model) throw 'model not found'
		if (!files) throw 'no files given'
		if (!files.path) throw 'no files path'
		let result = await uploadPromise(files.path, {})
		console.log('cloudinary returned', result)
		model[path] = result
		await model.save()
		res.json(model)
	} catch (error) {
		return res.status(500).json({ message: error })
	}
}
