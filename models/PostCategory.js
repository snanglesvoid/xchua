var keystone = require('keystone');

/**
 * PostCategory Model
 * ==================
 */

var PostCategory = new keystone.List('PostCategory', {
	autokey: { from: 'name.english', path: 'key', unique: true },
});

PostCategory.add({
	name: { 
		english: { type: String, required: true, initial: true },
		chinese: { type: String } 
	}
});

PostCategory.relationship({ ref: 'Post', path: 'posts', refPath: 'categories' });

PostCategory.register();
