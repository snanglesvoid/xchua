const keystone = require('keystone')
const Types = keystone.Field.Types

const ShelfRow = new keystone.List('ShefRow', {
	map: { name: index },
})

ShelfRow.add({
	index: { type: Types.Number, unique: true, initial: true },
	height: { type: Types.Number, default: 15 },
	updatedAt: { type: Types.Datetime, noedit: true, default: Date.now },
})

ShelfRow.defaultColumns = 'index, height'

ShelfRow.relationship({ ref: 'LibArticle', path: 'articles', refPath: 'row' })

ShelfRow.schema.pre('save', function(next) {
	this.updatedAt = new Date()
	next()
})

ShelfRow.register()
