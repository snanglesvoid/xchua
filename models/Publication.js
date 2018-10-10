const keystone = require('keystone')
const Types = keystone.Field.Types

const Publication = new keystone.List('Publication', {
    map: { name: 'title.english' },
    autokey: { path: 'slug', from: 'title.english', unique: true },
})

Publication.add({
    title: {
        english: { type: String, required: true },
        chinese: { type: String }
    },
    author: {
        english: { type: String },
        chinese: { type: String },
    },
    year: {
        type: Number
    },
    description: {
        english: {type: Types.Html, wysiwyg: true, height: 400},
        chinese: {type: Types.Html, wysiwyg: true, height: 400}
    },
    cover: { type: Types.CloudinaryImage },
    pictures: { type: Types.CloudinaryImages },
    state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
})

Publication.schema.methods.caption = function(lang) {
    return `
        <h2>
        ${this.title[lang] || this.title.english }<br/>
        </h2>
        <p>
        ${this.author ? (this.author[lang] || this.author.english) + '<br/>' : ''}
        ${this.year ? this.year + '<br/>' : ''}
        </p>
    `
}

Publication.defaultColumns = 'title.english, cover, state|20%'


Publication.register()
