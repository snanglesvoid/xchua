const keystone = require('keystone')
const Types = keystone.Field.Types

const Exhibition = new keystone.List('Exhibition', {
    map: { name: 'title' },
    autokey: { path: 'slug', from: 'title', unique: true }
})

Exhibition.add({
    title:     { type: String, required: true },
    state:     { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
    date:      {
                    start: { type: Types.Date, index: true },
                    end:   { type: Types.Date, index: true },
               },
    text:      { type: Types.Html, wysiwyg: true, height: 400 },
    location:  { type: Types.Select, options: 'Beijing, Berlin' },
    artists:   { type: Types.Relationship, ref: 'Artist', many: true },
    thumbnail: { type: Types.CloudinaryImage },
    pictures:  { type: Types.CloudinaryImages },
    artworks:  { type: Types.Relationship, ref: 'Artwork', many: true }
})

// Exhibition.relationship({ ref: 'Artist', path: 'artists', refPath: 'exhibitions' })

Exhibition.defaultColumns = 'title, thumbnail|20%, state|20%'
Exhibition.register()