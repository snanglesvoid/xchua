var keystone = require('keystone');

/**
 * PostCategory Model
 * ==================
 */

var PostCategory = new keystone.List('PostCategory', {
	autokey: { from: 'name.english', path: 'key', unique: true },
	map: { name: 'name.english' }
});

PostCategory.add({
	name: { 
		english: { type: String, required: true, initial: true },
		chinese: { type: String },
		german: { type: String },
	}
});

PostCategory.relationship({ ref: 'Post', path: 'posts', refPath: 'category' });

PostCategory.register();
