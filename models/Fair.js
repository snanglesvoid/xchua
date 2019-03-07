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
    updatedAt: { type: Types.Datetime, noedit: true, default: Date.now },
    state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
    thumbnail: { type: Types.CloudinaryImage },
    date: {
        start: { type: Types.Date, index: true },
        end:   { type: Types.Date, index: true }
    },
    text:  { 
        english: { type: Types.Html, wysiwyg: true, height: 400 },
        chinese: { type: Types.Html, wysiwyg: true, height: 400 },
    },
    artists: { type: Types.Relationship, ref: 'Artist', many: true }
})

Fair.defaultColumns = 'title.english, thumbnail|20%, state|10%, updatedAt|20%'

Fair.schema.methods.translate = function(lang) {
    this.title = this.title[lang] || this.title.english
}

Fair.schema.pre('save', next => {
    this.updatedAt = new Date()
    next()
})

Fair.register()