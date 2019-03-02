const keystone = require('keystone')
const Types = keystone.Field.Types

const Artist = new keystone.List('Artist', {
    autokey: { path: 'slug', from: 'name.english', unique: true },
    map: { name: 'name.english' },
    defaultSort: '-listPriority'
})

Artist.add({
    name:          { 
        english: { type: Types.Name, required: true, index: true },
        chinese: { type: Types.Name }
    },
    state:         { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
    updatedAt:     { type: Types.Datetime, noedit: true, default: Date.now },
    biography:     { 
        english: { type: Types.Html, wysiwyg: true, height: 400 },
        chinese: { type: Types.Html, wysiwyg: true, height: 400 },
    },
    picture:       { type: Types.CloudinaryImage },
    thumbnail:     { type: Types.CloudinaryImage },
    selectedWork:  { type: Types.Relationship, ref: 'Artwork' },
    listPriority:  { type: Number, default: 0 }
    // artworks:      { type: Types.Relationship, ref: 'Artwork', many: true },
    // exhibitions:   { type: Types.Relationship, ref: 'Exhibition', many: true }
})

Artist.relationship({ ref: 'Artwork', path: 'artworks', refPath: 'artist' })
Artist.relationship({ ref: 'ArtworkSeries', path: 'series', refPath: 'artist'})
Artist.relationship({ ref: 'Exhibition', path: 'exhibitions', refPath: 'artists'})
Artist.relationship({ ref: 'Fair', path: 'fairs', refPath: 'artists'})

Artist.defaultColumns = 'name.english, thumbnail|20%, state|10%, updatedAt|10%'

Artist.schema.pre('save', next => {
    this.updatedAt = new Date()
    next(null)
})

Artist.register()