const keystone = require('keystone')
const Types = keystone.Field.Types

const Textsnippet = new keystone.List('Textsnippet', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', index: true },
})

Textsnippet.add({
	title: { type: String, required: true, noedit: true, initial: true },
	updatedAt: { type: Types.Datetime, noedit: true, default: Date.now },
	content: {
		english: { type: String },
		chinese: { type: String },
		german: { type: String },
	},
})

Textsnippet.defaultColumns =
	'title, content.english, content.chinese, content.german'

Textsnippet.schema.pre('save', function(next) {
	this.updatedAt = new Date()
	next()
})

Textsnippet.register()
