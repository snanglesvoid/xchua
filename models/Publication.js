const keystone = require('keystone')
const Types = keystone.Field.Types

const Publication = new keystone.List('Publication', {
    map: { name: 'title' },
    autokey: { path: 'slug', from: 'title', unique: true },
})

Publication.add({
    title: { type: String, required: true },
    state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
    publishedDate: { type: Types.Date, index: true, dependsOn: {state: 'published' } },
    description: { type: Types.Html, wysiwyg: true, height: 300 },
    titleImage: { typre: Types.CloudinaryImage },
})


Publication.defaultColumns = 'title, slug|20%, state|20%'
