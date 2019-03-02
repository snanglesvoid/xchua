const keystone = require('keystone')
const Types = keystone.Field.Types

const Textsnippet = new keystone.List('Textsnippet', {
    map: { name: 'title' },
    autokey: { path: 'slug', from: 'title', index: true }
})

Textsnippet.add({
    title: { type: String, required: true, noedit: true, initial: true },
    updatedAt: { type: Types.Datetime, noedit: true, default: Date.now },
    content: {
        english: { type: String },
        chinese: { type: String },
    }
})

Textsnippet.defaultColumns = 'title, content.english, updatedAt'

Textsnippet.schema.pre('save', next => {
    this.updatedAt = new Date()
    next()
})

Textsnippet.register()