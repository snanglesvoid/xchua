const keystone = require('keystone')
const Types = keystone.Field.Types

const FrontPageImage = new keystone.List('FrontPageImage', {
	autokey: { path: 'slug', from: 'title.english', unique: true },
	map: { name: 'title.english' },
	defaultSort: '-listPriority',
})

FrontPageImage.add({
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
	subtitle: {
		english: { type: String },
		chinese: { type: String },
		german: { type: String },
	},
	caption: {
		english: { type: String },
		chinese: { type: String },
		german: { type: String },
	},
	location: {
		type: Types.Relationship,
		ref: 'GallerySpace',
	},
	linkUrl: { type: String, default: '#' },
	textColor: {
		type: Types.Select,
		options: ['bright', 'dark', 'custom'],
		default: 'bright',
	},
	customColor: { type: String, dependsOn: { textColor: 'custom' } },
	textPlacement: {
		type: Types.Select,
		options: ['left', 'right', 'center', 'top'],
		default: 'right',
	},
	image: { type: Types.CloudinaryImage },
	active: { type: Boolean, default: true },
	listPriority: { type: Number, default: 0 },
})

FrontPageImage.defaultColumns =
	'title.english, caption.english, textPlacement, image|20%, listPriority|8%, updatedAt: 20%'

FrontPageImage.schema.methods.translate = function(lang) {
	this.title = this.title[lang] || this.title.english
	this.caption = this.caption[lang] || this.caption.english
}

FrontPageImage.schema.methods.locationName = function(lang) {
	if (lang == 'english' || !lang) {
		return this.location
	} else if (lang == 'chinese') {
		return this.location == 'Berlin' ? '柏林' : '北京'
	} else {
		return this.location
	}
}

FrontPageImage.schema.pre('save', function(next) {
	this.updatedAt = new Date()
	next()
})

FrontPageImage.register()
