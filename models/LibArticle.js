const keystone = require('keystone')
const Types = keystone.Field.Types

const LibArticle = new keystone.List('LibArticle', {
	map: { name: 'title.english' },
	autokey: { path: 'slug', from: 'title.english', unique: true },
})

LibArticle.add({
	title: {
		english: { type: String, required: true },
		chinese: { type: String },
		german: { type: String },
	},
	updatedAt: { type: Types.Datetime, noedit: true, default: Date.now },
	state: {
		type: Types.Select,
		options: 'draft, published, archived',
		default: 'draft',
		index: true,
	},
	picture: { type: Types.CloudinaryImage },
	pictures: { type: Types.CloudinaryImages },
	description: {
		english: { type: Types.Html, wysiwyg: true, height: 400 },
		chinese: { type: Types.Html, wysiwyg: true, height: 400 },
		german: { type: Types.Html, wysiwyg: true, height: 400 },
	},
	size: {
		type: number,
		default: 10,
	},
})

LibArticle.defaultColumns =
	'title.english, picture|20%, state|10%, updatedAt|20%'

LibArticle.schema.pre('save', function(next) {
	this.updatedAt = new Date()
	next()
})

LibArticle.register()
