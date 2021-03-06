const keystone = require('keystone')
const Types = keystone.Field.Types

const Exhibition = new keystone.List('Exhibition', {
	map: { name: 'title.english' },
	autokey: { path: 'slug', from: 'title.english', unique: true },
	sortOrder: '-date.start',
})

Exhibition.add({
	title: {
		english: { type: String, required: true },
		chinese: { type: String },
	},
	updatedAt: { type: Types.Datetime, noedit: true, default: Date.now },
	state: {
		type: Types.Select,
		options: 'draft, published, archived',
		default: 'draft',
		index: true,
	},
	date: {
		start: { type: Types.Date, required: true, initial: true, index: true },
		end: { type: Types.Date, required: true, initial: true, index: true },
	},
	text: {
		english: { type: Types.Html, wysiwyg: true, height: 400 },
		chinese: { type: Types.Html, wysiwyg: true, height: 400 },
		german: { type: Types.Html, wysiwyg: true, height: 400 },
	},
	//location:  { type: Types.Select, options: 'Beijing, Berlin' },
	location: {
		type: Types.Relationship,
		ref: 'GallerySpace',
		required: true,
		initial: true,
	},
	artists: { type: Types.Relationship, ref: 'Artist', many: true },
	coverPicture: { type: Types.CloudinaryImage },
	pictures: { type: Types.CloudinaryImages },
	artworks: { type: Types.Relationship, ref: 'Artwork', many: true },
})

// Exhibition.relationship({ ref: 'Artist', path: 'artists', refPath: 'exhibitions' })

Exhibition.schema.methods.locationName = function(lang) {
	if (lang == 'english' || !lang) {
		return this.location
	} else if (lang == 'chinese') {
		return this.location == 'Berlin' ? '柏林' : '北京'
	} else {
		return this.location
	}
}

Exhibition.defaultColumns =
	'title.english, coverPicture|20%, state|10%, updatedAt|20%'

Exhibition.schema.pre('save', function(next) {
	this.updatedAt = new Date()
	next()
})

Exhibition.register()
