const keystone = require('keystone')
const Types = keystone.Field.Types

const GallerySpace = new keystone.List('GallerySpace', {
    map: { name: 'location.english' },
})

GallerySpace.add({
    location: {
        english: { type: String, required: true },
        chinese: { type: String }
    },
    published: { type: Boolean },
    address: {
        english: { type: Types.Html, wysiwyg: true, height: 50 },
        chinese: { type: Types.Html, wysiwyg: true, height: 50 },
    },
    phone: {
        type: String
    },
    openingHours: {
        english: { type: String },
        chinese: { type: String }
    },
    image: {
        type: Types.CloudinaryImage
    }
})

GallerySpace.defaultColumns = 'location.english'

GallerySpace.register()