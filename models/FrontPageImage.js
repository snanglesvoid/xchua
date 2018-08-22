const keystone = require('keystone')
const Types = keystone.Field.Types

const FrontPageImage = new keystone.List('FrontPageImage', {
    map: { name: 'title' },
})

FrontPageImage.add({
    title:         { type: String, required: true },
    caption:       { type: String },
    linkUrl:       { type: String, default: '#'},
    textColor:     { type: Types.Select, options: ['bright', 'dark'], default: 'bright'},
    textPlacement: { type: Types.Select, options: ['left', 'right', 'center', 'top'], default: 'right'},
    image:         { type: Types.CloudinaryImage },
    active:        { type: Boolean, default: true },
})

FrontPageImage.defaultColumns = 'title, caption, textPlacement, image|20%'

FrontPageImage.register()