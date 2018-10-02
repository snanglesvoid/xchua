var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Post = new keystone.List('Post', {
	map: { name: 'title.english' },
	autokey: { path: 'slug', from: 'title.english', unique: true },
});

Post.add({
	title: { 
		english: { type: String, required: true },
		chinese: { type: String },
	},
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true, default: Date.now },
	image: { type: Types.CloudinaryImage },
	content: { 
		english: {
			brief: { type: Types.Html, wysiwyg: true, height: 150 },
			extended: { type: Types.Html, wysiwyg: true, height: 400 },
		}, 
		chinese : {
			brief: { type: Types.Html, wysiwyg: true, height: 150 },
			extended: { type: Types.Html, wysiwyg: true, height: 400 },
		}
	},
	category: { type: Types.Relationship, ref: 'PostCategory' },
});

Post.schema.virtual('content.english.full').get(function () {
	if (!this.content.english) return ''
	return this.content.english.extended || this.content.english.brief;
});

Post.schema.virtual('content.chinese.gull').get(function () {
	if (!this.content.chinese) return ''
	return this.content.chinese.extended || this.content.chinese.brief;
})

Post.defaultColumns = 'title.english, state|20%, category|20%, publishedDate|20%';
Post.register();
