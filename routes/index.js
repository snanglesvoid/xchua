/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
	admin: importRoutes('./admin'),
	api: importRoutes('./api')
};

// Setup Route Bindings
exports = module.exports = function (app) {
	// Views
	app.get('/', routes.views.index);

	app.get('/artists', routes.views.artists);
	app.get('/artist/:slug', routes.views.artist);
	app.get('/exhibitions', routes.views.exhibitions);
	app.get('/exhibition/:slug', routes.views.exhibition);
	app.get('/publications', routes.views.publications);
	app.get('/publication/:slug', routes.views.publication);
	app.get('/fairs', routes.views.fairs);
	app.get('/fair/:slug', routes.views.fair);
	app.get('/about', routes.views.about);
	app.get('/layout', routes.views.layout);
	app.get('/texts/:slug', routes.views.text);
	app.get('/pages/wechat', routes.views.wechat);
	
	app.get('/admin/updateExhibitionSlugs', middleware.requireUser, routes.admin.updateExhibitionSlugs);
	app.all('/admin/backup', middleware.requireUser, routes.admin.backup);
	app.get('/admin/backup-json', middleware.requireUser, routes.admin['backup-json'])

	app.get('/blog/:category?', routes.views.blog);
	app.get('/blog/post/:post', routes.views.post);
	app.get('/gallery', routes.views.gallery);
	app.all('/contact', routes.views.contact);
	app.all('/subscribe', routes.views.subscribe);

	app.get('/api/artworks', [keystone.middleware.api, keystone.middleware.cors], routes.api.artworks.get)
	app.get('/api/artwork/:slug', [keystone.middleware.api, keystone.middleware.cors], routes.api.artwork.get)
	app.post('/api/artwork', [keystone.middleware.api, keystone.middleware.cors], routes.api.artwork.post)
	app.delete('/api/artwork', [keystone.middleware.api, keystone.middleware.cors], routes.api.artwork.delete)

	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);

};
