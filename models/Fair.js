const keystone = require('keystone')
const Types = keystone.Field.Types

const Fair = new keystone.List('Fair', {
    map: { name: 'title' },
    autokey: { path: 'slug', from: 'title', unique: true }
})

Fair.add({
    title: { type: String, required: true },
    state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
    thumbnail: { type: Types.CloudinaryImage },
    date: {
        start: { type: Date, index: true },
        end:   { type: Date, index: true }
    },
    artists: { type: Types.Relationship, ref: 'Artist', many: true }
})

Fair.defaultColumns = 'title, thumbnail|20%, state|20%'
Fair.register()