const keystone = require('keystone')
const Types = keystone.Field.Types

const Textblock = new keystone.List('Textblock', {
    map: { name: 'title' },
    autokey: { path: 'slug', from: 'title', index: true }
})

Textblock.add({
    title: { type: String, required: true, noedit: true, initial: true },
    content: {
        english: { type: Types.Html, wysiwyg: true, height: 150 },
        chinese: { type: Types.Html, wysiwyg: true, height: 150 },
    }
})

Textblock.defaultColumns = 'title'
Textblock.register()