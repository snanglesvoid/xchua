const keystone = require('keystone')
const Types = keystone.Field.Types

const Artwork = new keystone.List('Artwork', {
    map: { name: 'title' },
    autokey: { path: 'slug', from: 'title', unique: true }
})

Artwork.add({
    title:       { type: String, required: true },
    image:       { type: Types.CloudinaryImage },
    year:        { type: Number },
    description: { type: String },
    dimensions:  { type: String },
    artist:      { type: Types.Relationship, ref: 'Artist' },
    masonrySize: { type: Types.Select, options: ['small', 'big'], default: 'small'}
})

Artwork.defaultColumns = 'title, artist, image|20%, year|20%, description|20%'

Artwork.register()