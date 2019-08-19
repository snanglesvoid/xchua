const keystone = require('keystone')
const Types = keystone.Field.Types

const Publication = new keystone.List('Publication', {
	map: { name: 'title.english' },
	autokey: { path: 'slug', from: 'title.english', unique: true },
})

Publication.add({
	title: {
		english: { type: String, required: true },
		chinese: { type: String },
		german: { type: String },
	},
	updatedAt: {
		type: Types.Datetime,
		noedit: true,
		default: Date.now,
	},
	author: {
		english: { type: String },
		chinese: { type: String },
	},
	year: {
		type: Number,
	},
	description: {
		english: { type: Types.Html, wysiwyg: true, height: 400 },
		chinese: { type: Types.Html, wysiwyg: true, height: 400 },
		german: { type: Types.Html, wysiwyg: true, height: 400 },
	},
	cover: { type: Types.CloudinaryImage },
	pictures: { type: Types.CloudinaryImages },
	state: {
		type: Types.Select,
		options: 'draft, published, archived',
		default: 'draft',
		index: true,
	},
})

Publication.schema.methods.caption = function(lang) {
	return `
        <h2>
        ${this.title[lang] || this.title.english}<br/>
        </h2>
        <p>
        ${
					this.author
						? (this.author[lang] || this.author.english) + '<br/>'
						: ''
				}
        ${this.year ? this.year + '<br/>' : ''}
        </p>
    `
}

Publication.defaultColumns = 'title.english, cover, state|10%, updatedAt|20%'

Publication.schema.pre('save', function(next) {
	this.updatedAt = new Date()
	next()
})

Publication.register()
