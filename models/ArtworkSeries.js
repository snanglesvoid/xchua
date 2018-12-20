const keystone = require('keystone')
const Types = keystone.Field.Types

const ArtworkSeries = new keystone.List('ArtworkSeries', {
    map: { name: 'title.english' },
    autokey: { path: 'slug', from: 'title.english', unique: true },
})

ArtworkSeries.add({
    title: {
        english : { type: String, required: true },
        chinese : { type: String }
    },

    artist: {
        type: Types.Relationship, ref: 'Artist', initial: true, required: true, editable: false
    },

    artworks: {
        type: Types.Relationship, ref: 'Artwork', many: true, filters: { artist: ':artist' }
    },

    selectedWork: {
        type: Types.Relationship, ref: 'Artwork', filters: { artist: ':artist' }
    },

    // year: {
    //     type: Number
    // }
})

// ArtworkSeries.relationship({ ref: 'Artwork', path: 'artworks', refPath: 'series'})

ArtworkSeries.defaultColumns = 'title.english, artist, selectedWork'

ArtworkSeries.register()