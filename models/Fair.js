const keystone = require('keystone')
const Types = keystone.Field.Types

const Fair = new keystone.List('Fair', {
    map: { name: 'title.english' },
    autokey: { path: 'slug', from: 'title.english', unique: true }
})

Fair.add({
    title: { 
        english: { type: String, required: true },
        chinese: { type: String }
    },
    state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
    thumbnail: { type: Types.CloudinaryImage },
    date: {
        start: { type: Date, index: true },
        end:   { type: Date, index: true }
    },
    artists: { type: Types.Relationship, ref: 'Artist', many: true }
})

Fair.defaultColumns = 'title, thumbnail|20%, state|20%'

Fair.schema.methods.translate = function(lang) {
    this.title = this.title[lang] || this.title.english
}
Fair.register()