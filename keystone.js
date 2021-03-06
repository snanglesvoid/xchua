// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require("dotenv").config();

// Require keystone
var keystone = require("keystone");

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/confipg for available options
// and documentation.

keystone.init({
	name: "XC.HuA",
	brand: "XC.HuA",

	less: "public",
	static: ["public"],
	favicon: "public/favicon.ico",
	views: "templates/views",
	"view engine": "pug",

	"auto update": true,
	session: true,
	auth: true,
	"user model": "User",
	// 'wysiwyg cloudinary images': true,
	// 'wysiwyg additional options': {
	// 	'external_plugins': {
	// 		'uploadimage': '/js/uploadimage/plugin.min.js'
	// 	}
	// }
});

keystone.set("cloudinary secure", true);

// Load your project's Models
keystone.import("models");

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set("locals", {
	_: require("lodash"),
	env: keystone.get("env"),
	utils: keystone.utils,
	editable: keystone.content.editable,
});

// Wysiwyg options
keystone.set("wysiwyg additional buttons", "blockquote, formatselect");

// Load your project's Routes
keystone.set("routes", require("./routes"));

keystone.set("cors allow origin", true);
keystone.set("cors allow methods", true);
keystone.set("cors allow headers", true);

// Configure the navigation bar in Keystone's Admin UI
keystone.set("nav", {
	content: [
		"artists",
		"exhibitions",
		"publications",
		"fairs",
		"artworks",
		"artwork-series",
		"lib-articles",
	],
	// artists: 'artists',
	// exhibitions: 'exhibitions',
	// publications: 'publications',
	// fairs: 'fairs',
	// artworks: 'artworks',
	// galleries: 'galleries',
	// enquiries: 'enquiries',
	frontPage: ["front-page-images"],
	aboutPage: ["gallery-spaces"],
	posts: ["posts", "post-categories"],
	viewingRooms: ["viewing-rooms", "content-blocks"],
	more: [
		"textblocks",
		"textsnippets",
		"galleries",
		"enquiries",
		"social-links",
	],
	users: "users",
});

// Start Keystone to connect to your database and initialise the web server

// console.log(keystone.get("logger"));

keystone.start();
