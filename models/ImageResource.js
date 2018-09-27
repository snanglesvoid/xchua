const keystone = require('keystone')
const Types = keystone.Field.Types

const ImageResource = new keystone.List('ImageResource', {
    autokey: { from: 'title.english', path: 'slug', unique: true },
    map: { name: 'title' }
})

ImageResource.add({
    title: {
        english: { type: String, required: true, initial: true },
        chinese: { type: String }
    },
    caption: { 
        english: { type: Types.Text },
        chinese: { type: Types.Text }
    },
    image: { type: Types.CloudinaryImage },
})