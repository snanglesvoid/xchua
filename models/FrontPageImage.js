const keystone = require('keystone')
const Types = keystone.Field.Types

const FrontPageImage = new keystone.List('FrontPageImage', {
    map: { name: 'title.english' },
})

FrontPageImage.add({
    title:         { 
        english: { type: String, required: true },
        chinese: { type: String}
    },
    updatedAt: {
        type: Types.Datetime, noedit: true, default: Date.now
    },
    subtitle: {
        english: { type: String },
        chinese: { type: String }
    },
    caption:       { 
        english: { type: String },
        chinese: { type: String } 
    },
    linkUrl:       { type: String, default: '#'},
    textColor:     { type: Types.Select, options: ['bright', 'dark', 'custom'], default: 'bright'},
    customColor:   { type: String, dependsOn: { textColor: 'custom'} },
    textPlacement: { type: Types.Select, options: ['left', 'right', 'center', 'top'], default: 'right'},
    image:         { type: Types.CloudinaryImage },
    active:        { type: Boolean, default: true },
})

FrontPageImage.defaultColumns = 'title.english, caption.english, textPlacement, image|20%, updatedAt: 20%'

FrontPageImage.schema.methods.translate = function(lang) {
    this.title = this.title[lang] || this.title.english
    this.caption = this.caption[lang] || this.caption.english
}

FrontPageImage.schema.pre('save', function(next) {
    this.updatedAt = new Date()
    next()
})

FrontPageImage.register() 