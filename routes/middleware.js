/**
 * This file contains the common middleware used by your routes.
 *
 * Extend or replace these functions as your application requires.
 *
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */
const _ = require('lodash');
const keystone = require('keystone')
const async = require('async')
/**
	Initialises the standard view locals

	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/

function inlineEditable(user, data) {
	if (!user) return ''
	else return JSON.stringify(data)
}

function snippetEditable(user, data, lang) {
	if (!user) return ''
	return JSON.stringify ({
		list: 'textsnippets',
		path: 'content.' + (lang || 'english'),
		data: JSON.stringify(data)
	})
}

function inlineImageUpload(user, data) {
	if (!user) return ''
	else return JSON.stringify(data)
}

exports.cors = function (req, res, next) {
	console.log('cors')
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	next()
}

exports.initLocals = function (req, res, next) {
	// res.locals.navLinks = [
	// 	{ label: 'Home', key: 'home', href: '/' },
	// 	{ label: 'Blog', key: 'blog', href: '/blog' },
	// 	{ label: 'Gallery', key: 'gallery', href: '/gallery' },
	// 	{ label: 'Contact', key: 'contact', href: '/contact' },
	// ];
	res.locals.user = req.user;
	res.locals.lang = req.query['lang'] || 'english'
	res.locals.inlineEditable = inlineEditable
	res.locals.inlineImageUpload = inlineImageUpload
	res.locals.snippetEditable = snippetEditable
	async.each([
		//init post categories
		(cb) => {
			keystone.list('PostCategory').model.find().exec((err, ps) => {
				res.locals.postCategories = ps
				cb(err)
			})
		},
		//init menu item textblocks
		(cb) => {
			keystone.list('Textsnippet').model.find({
					// slug: /menu/i
				})
				.exec((err, tbs) => {
					res.locals.snippets = {}
					tbs.forEach(tb => {
						res.locals.snippets[tb.slug] = tb
					})
					cb(err)
				})

		},
		//init social links
		(cb) => {
			keystone.list('SocialLink').model.find()
				.exec((err, links) => {
					res.locals.socialLinks = links
					cb(err)
				})
		}
	], 
	(fn, cb) => fn(cb),
	err => {
		next(err)
	})
};


/**
	Fetches and clears the flashMessages before a view is rendered
*/
exports.flashMessages = function (req, res, next) {
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error'),
	};
	res.locals.messages = _.some(flashMessages, function (msgs) { return msgs.length; }) ? flashMessages : false;
	next();
};


/**
	Prevents people from accessing protected pages when they're not signed in
 */
exports.requireUser = function (req, res, next) {
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}
};
