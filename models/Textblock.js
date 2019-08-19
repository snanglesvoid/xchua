const keystone = require('keystone')
const Types = keystone.Field.Types

const Textblock = new keystone.List('Textblock', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', index: true },
})

Textblock.add({
	title: { type: String, required: true, noedit: true, initial: true },
	updatedAt: { type: Types.Datetime, noedit: true, default: Date.now },
	content: {
		english: { type: Types.Html, wysiwyg: true, height: 150 },
		chinese: { type: Types.Html, wysiwyg: true, height: 150 },
		german: { type: Types.Html, wysiwyg: true, height: 150 },
	},
})

Textblock.defaultColumns = 'title, updatedAt'

Textblock.schema.pre('save', function(next) {
	this.updatedAt = new Date()
	next()
})

Textblock.register()
