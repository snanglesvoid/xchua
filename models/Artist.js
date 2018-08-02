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
    works:         { type: Types.CloudinaryImages },
})

Artist.defaultColumns = 'name, state|20%, publishedDate|20%'


Artist.register()