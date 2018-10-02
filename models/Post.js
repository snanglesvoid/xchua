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
	publishedDate: { type: Types.Date, index: true, default: date.now },
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
	categories: { type: Types.Relationship, ref: 'PostCategory', many: true },
});

Post.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Post.defaultColumns = 'title.english, state|20%, author|20%, publishedDate|20%';
Post.register();
