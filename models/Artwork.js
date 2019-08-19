const keystone = require('keystone')
const Types = keystone.Field.Types

const Artwork = new keystone.List('Artwork', {
	map: { name: 'title.english' },
	autokey: { path: 'slug', from: 'title.english', unique: true },
	defaultSort: '-artist',
})

Artwork.add({
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
	image: { type: Types.CloudinaryImage },
	pictures: { type: Types.CloudinaryImage },
	year: { type: String },
	description: {
		english: { type: String },
		chinese: { type: String },
		german: { type: String },
	},
	dimensions: { type: String },
	price: { type: String },
	availability: { type: Boolean, default: false },
	note: { type: Types.Html, wysiwyg: true, height: 20 },
	artist: { type: Types.Relationship, ref: 'Artist' },
	artistName: {
		english: { type: String, noedit: true },
		chinese: { type: String, noedit: true },
		german: { type: String, noedit: true },
	},
	// series:      { type: Types.Relationship, ref: 'ArtworkSeries' }
	// masonrySize: { type: Types.Select, options: ['small', 'big'], default: 'small'}
})

Artwork.schema.methods.caption = function(lang, artist) {
	// return `
	//     <h2>${this.title[lang] || this.title.english}</h2>
	//     <p>
	//     ${this.year ? this.year + '<br/>' : ''}
	//     ${this.description && this.description.english ? (this.description[lang] || this.description.english) + '<br/>' : ''}
	//     ${this.dimensions}
	//     </p>
	// `

	let res = '<p>'
	if (artist && artist.name) {
		let name =
			artist.name[lang] && artist.name[lang].first
				? artist.name[lang]
				: artist.name.english
		res += `
        <a href="/artist/${artist.slug}" style='font-weight: bold;'>${
			name.first
		}&nbsp;${name.last}</a></br>
        `
	}
	res += this.title[lang] || this.title.english
	if (this.year) res += `, ${this.year}`
	res += '<br/>'
	if (this.series && (this.series[lang] || this.series.english)) {
		res += `${this.series[lang] || this.series.english}<br/>`
	}
	if (
		this.description &&
		(this.description[lang] || this.description.english)
	) {
		res += `${this.description[lang] || this.description.english}<br/>`
	}
	if (this.dimensions) res += this.dimensions
	res += '</p>'
	return res
}

Artwork.relationship({
	ref: 'ArtworkSeries',
	path: 'series',
	refPath: 'artworks',
})

Artwork.defaultColumns =
	'title.english, artist, image|10%, year|10%, description.english|20%, updatedAt|20%'

Artwork.schema.pre('save', async function(next) {
	this.updatedAt = new Date()
	if (this.artist) {
		try {
			let artist = await keystone.list('Artist').model.findById(this.artist)
			// if (!artist) {
			//     this.artist = null
			//     return next()
			// }
			if (artist.name.english) {
				this.artistName.english =
					artist.name.english.first + ' ' + artist.name.english.last
			}
			if (artist.name.chinese) {
				this.artistName.chinese =
					artist.name.chinese.first + ' ' + artist.name.chinese.last
			}
			if (artist.name.german) {
				this.artistName.german =
					artist.name.german.first + ' ' + artist.name.german.last
			}
		} catch (error) {
			return next(error)
		}
	}
	next()
})

Artwork.register()
