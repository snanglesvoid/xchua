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
    description: { 
        brief: { type: Types.Html, wysiwyg: true, height: 50  },
        extended: { type: Types.Html, wysiwyg: true, height: 400 },
    },
    thumbnail: { type: Types.CloudinaryImage },
})


Publication.schema.virtual('description.full').get(function() {
    return this.description.extended || this.description.brief
})

Publication.defaultColumns = 'title, thumbnail, state|20%'

Publication.register()
