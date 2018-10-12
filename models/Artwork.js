const keystone = require('keystone')
const Types = keystone.Field.Types

const Artwork = new keystone.List('Artwork', {
    map: { name: 'title.english' },
    autokey: { path: 'slug', from: 'title.english', unique: true }
})

Artwork.add({
    title:       { 
        english : { type: String, required: true },
        chinese : { type: String },
    },
    series:      {
        english : { type: String },
        chinese : { type: String },
    },
    image:       { type: Types.CloudinaryImage },
    pictures:    { type: Types.CloudinaryImage },
    year:        { type: String },
    description: { 
        english: { type: String },
        chinese: { type: String }, 
    },
    dimensions:  { type: String },
    artist:      { type: Types.Relationship, ref: 'Artist' },
    // masonrySize: { type: Types.Select, options: ['small', 'big'], default: 'small'}
})

Artwork.schema.methods.caption = function(lang, artist) {
    // return `
    //     <h2>${this.title[lang] || this.title.english}</h2>
    //     <p>
    //     ${this.year ? this.year + '<br/>' : ''}
    //     ${this.description && this.description.english ? (this.description[lang] || this.description.english) + '<br/>' : ''}
    //     ${this.dimensions}
    //     </p>
    // `
    
    let res = '<p>'
    if (artist && artist.name) {
        let name = artist.name[lang] && artist.name[lang].first
            ? artist.name[lang] : artist.name.english
        res += `
        <a href="/artist/${artist.slug}">${name.first}&nbsp;${name.last}</a></br>
        `
    }
    res += this.title[lang] || this.title.english
    if (this.year) res += `, ${this.year}`
    res += '<br/>'
    if (this.series && (this.series[lang] || this.series.english)) {
        res += `${this.series[lang] || this.series.english}<br/>`
    } 
    if (this.description && (this.description[lang] || this.description.english)) {
        res += `${this.description[lang] || this.description.english}<br/>`
    }
    if (this.dimensions) res += this.dimensions
    res += '</p>'
    return res
}

Artwork.defaultColumns = 'title.english, artist, image|20%, year|20%, description.english|20%'

Artwork.register()