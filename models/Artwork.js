const keystone = require('keystone')
const Types = keystone.Field.Types

const Artwork = new keystone.List('Artwork', {
    map: { name: 'title.english' },
    autokey: { path: 'slug', from: 'title.english', unique: true }
})

Artwork.add({
    title:       { 
        english : { type: String, required: true },
        chinese : { type: String }
    },
    image:       { type: Types.CloudinaryImage },
    year:        { type: Number },
    description: { 
        english: { type: String },
        chinese: { type: String }, 
    },
    dimensions:  { type: String },
    artist:      { type: Types.Relationship, ref: 'Artist' },
    // masonrySize: { type: Types.Select, options: ['small', 'big'], default: 'small'}
})

Artwork.schema.methods.caption = function(lang) {
    return `
        <h2>${this.title[lang] || this.title.english}</h2>
        <p>
        ${this.year ? this.year + '<br/>' : ''}
        ${this.description && this.description.english ? (this.description[lang] || this.description.english) + '<br/>' : ''}
        ${this.dimensions}
        </p>
    `
}

Artwork.defaultColumns = 'title.english, artist, image|20%, year|20%, description.english|20%'

Artwork.register()