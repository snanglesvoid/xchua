const keystone = require('keystone')
const Types = keystone.Field.Types

const Artist = new keystone.List('Artist', {
    autokey: { path: 'slug', from: 'name', unique: true }
})

Artist.add({
    name:          { type: Types.Name, required: true, index: true },
    state:         { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
    biography:     { type: Types.Html, wysiwyg: true, height: 400 },
    picture:       { type: Types.CloudinaryImage },
    thumbnail:     { type: Types.CloudinaryImage },
    // artworks:      { type: Types.Relationship, ref: 'Artwork', many: true },
    // exhibitions:   { type: Types.Relationship, ref: 'Exhibition', many: true }
})

Artist.relationship({ ref: 'Artwork', path: 'artworks', refPath: 'artist' })
Artist.relationship({ ref: 'Exhibition', path: 'exhibitions', refPath: 'artists'})
Artist.relationship({ ref: 'Fair', path: 'fairs', refPath: 'artists'})

Artist.defaultColumns = 'name, thumbnail|20%, state|20%'

Artist.register()