const keystone = require('keystone')
const Types = keystone.Field.Types

const Publication = new keystone.List('Publication', {
    map: { name: 'title.english' },
    autokey: { path: 'slug', from: 'title', unique: true },
})

Publication.add({
    title: {
        english: { type: String, required: true },
        chinese: { type: String }
    },  
    state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
    publishedDate: { type: Types.Date, index: true, dependsOn: {state: 'published' } },
    description: {
        english: {
            brief: { type: Types.Html, wysiwyg: true, height: 50  },
            extended: { type: Types.Html, wysiwyg: true, height: 400 },
        },
        chinese: {
            brief: { type: Types.Html, wysiwyg: true, height: 50  },
            extended: { type: Types.Html, wysiwyg: true, height: 400 },
        }
    },
    thumbnail: { type: Types.CloudinaryImage },
})


Publication.schema.virtual('description.full').get(function() {
    return this.description.extended || this.description.brief
})

Publication.defaultColumns = 'title.english, thumbnail, state|20%'


Publication.register()
