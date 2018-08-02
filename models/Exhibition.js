const keystone = require('keystone')
const Types = keystone.Field.Types

const Exhibition = new keystone.List('Exhibition', {
    map: { name: 'title' },
    autokey: { path: 'slug', from: 'title', unique: true }
})

Exhibition.add({
    title: { type: String, required: true },
    state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
    startDate: { type: Types.Date, index: true },
    endDate: { type: Types.Date, index: true },
    text: { type: Types.Html, wysiwyg: true, height: 400 },
    artist: { type: Types.Relationship, ref: 'Artist' },
    pictures: { type: Types.CloudinaryImages },
})

Exhibition.defaultColumns = 'title, state|20%, artist|20%'
Exhibition.register()