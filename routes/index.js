const keystone = require("keystone");
const middleware = require("./middleware");
const importRoutes = keystone.importer(__dirname);
const path = require("path");
const fs = require("fs");

// Common Middleware
keystone.pre("routes", middleware.initLocals);
keystone.pre("render", middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes("./views"),
	admin: importRoutes("./admin"),
	api: importRoutes("./api"),
};

// Setup Route Bindings
exports = module.exports = function (app) {
	// Views
	app.get("/", routes.views.index);

	app.get("/artists", routes.views.artists);
	app.get("/artist/:slug", routes.views.artist);
	app.get("/exhibitions", routes.views.exhibitions);
	app.get("/exhibition/:slug", routes.views.exhibition);
	app.get("/publications", routes.views.publications);
	app.get("/publication/:slug", routes.views.publication);
	app.get("/fairs", routes.views.fairs);
	app.get("/fair/:slug", routes.views.fair);
	app.get("/about", routes.views.about);
	app.get("/layout", routes.views.layout);
	app.get("/texts/:slug", routes.views.text);
	app.get("/pages/wechat", routes.views.wechat);

	app.get(
		"/admin/updateExhibitionSlugs",
		middleware.requireUser,
		routes.admin.updateExhibitionSlugs
	);
	app.all("/admin/backup", middleware.requireUser, routes.admin.backup);
	app.get(
		"/admin/backup-json",
		middleware.requireUser,
		routes.admin["backup-json"]
	);

	app.get(
		"/admin/api/frontPageImages",
		[keystone.middleware.api, keystone.middleware.cors, middleware.requireUser],
		routes.admin.frontPageImages.get
	);
	app.post(
		"/admin/api/frontPageImage",
		[keystone.middleware.api, keystone.middleware.cors, middleware.requireUser],
		routes.admin.frontPageImages.post
	);
	app.delete(
		"/admin/api/frontPageImage/:id",
		[keystone.middleware.api, keystone.middleware.cors, middleware.requireUser],
		routes.admin.frontPageImages.delete
	);
	app.post(
		"/admin/api/frontPageImagesOrder",
		[keystone.middleware.api, keystone.middleware.cors, middleware.requireUser],
		routes.admin.frontPageImages.updateOrder
	);
	app.post(
		"/admin/api/cloudinary/upload",
		[keystone.middleware.api, keystone.middleware.cors, middleware.requireUser],
		routes.admin.cloudinary.upload
	);
	app.post(
		"/admin/api/libArticle",
		[keystone.middleware.api, keystone.middleware.cors],
		routes.admin.libArticles.post
	);
	app.get("/admin", [middleware.requireUser], (req, res) => {
		res.sendFile(
			path.resolve(
				__dirname + "/../../xc-hua-admin/dist/xc-hua-admin/index.html"
			)
		);
	});
	app.get("/admin/:filename", [middleware.requireUser], (req, res) => {
		let filename = req.params.filename;
		let fullpath = path.resolve(
			__dirname + "/../../xc-hua-admin/dist/xc-hua-admin/" + filename
		);
		console.log("get: ", fullpath);
		if (fs.existsSync(fullpath)) {
			res.sendFile(fullpath);
		} else {
			res.sendFile(
				path.resolve(
					__dirname + "/../../xc-hua-admin/dist/xc-hua-admin/index.html"
				)
			);
		}
	});

	app.get("/blog/:category?", routes.views.blog);
	app.get("/blog/post/:post", routes.views.post);
	app.get("/gallery", routes.views.gallery);
	app.all("/contact", routes.views.contact);
	app.all("/subscribe", routes.views.subscribe);

	// app.get('/api/artworks', [keystone.middleware.api, keystone.middleware.cors], routes.api.artworks.get)
	// app.get('/api/artwork/:slug', [keystone.middleware.api, keystone.middleware.cors], routes.api.artwork.get)
	// app.post('/api/artwork', [keystone.middleware.api, keystone.middleware.cors], routes.api.artwork.post)
	// app.delete('/api/artwork', [keystone.middleware.api, keystone.middleware.cors], routes.api.artwork.delete)

	app.get(
		"/api/artists",
		[keystone.middleware.api, middleware.cors],
		routes.api.artists.get
	);
	app.get(
		"/api/artist/:slug",
		[keystone.middleware.api, middleware.cors],
		routes.api.artist.get
	);
	app.get(
		"/api/exhibitions",
		[keystone.middleware.api, middleware.cors],
		routes.api.exhibitions
	);
	app.get(
		"/api/exhibitions/:artistId",
		[keystone.middleware.api, middleware.cors],
		routes.api.exhibitions
	);
	app.get(
		"/api/exhibition/:slug",
		[keystone.middleware.api, middleware.cors],
		routes.api.exhibition
	);
	app.get(
		"/api/fairs",
		[keystone.middleware.api, middleware.cors],
		routes.api.fairs
	);
	app.get(
		"/api/sociallinks",
		[keystone.middleware.api, middleware.cors],
		routes.api.sociallinks
	);
	app.get(
		"/api/snippets",
		[keystone.middleware.api, middleware.cors],
		routes.api.snippets
	);
	app.get(
		"/api/front-page-images",
		[keystone.middleware.api, middleware.cors],
		routes.api.frontPageImages
	);
	app.get(
		"/api/blog/:category",
		[keystone.middleware.api, middleware.cors],
		routes.api.blog
	);
	app.get(
		"/api/gallery-spaces",
		[keystone.middleware.api, middleware.cors],
		routes.api.gallerySpaces
	);
	app.get(
		"/api/text/:slug",
		[keystone.middleware.api, middleware.cors],
		routes.api.text
	);

	app.get(
		"/api/artworks/:artistId",
		[keystone.middleware.api, middleware.cors],
		routes.api.artworks.get
	);
	app.get(
		"/api/artworks",
		[keystone.middleware.api, middleware.cors],
		routes.api.artworks.get
	);

	app.get(
		"/api/artwork-series/:artistId",
		[keystone.middleware.api, middleware.cors],
		routes.api["artwork-series"]
	);
	app.get(
		"/api/artwork-series",
		[keystone.middleware.api, middleware.cors],
		routes.api["artwork-series"]
	);

	app.get(
		"/api/lib-articles",
		[keystone.middleware.api, middleware.cors],
		routes.api["lib-articles"]
	);

	app.post(
		"/api/contact",
		[keystone.middleware.api, middleware.cors],
		routes.api.contact
	);
	app.post(
		"/api/subscribe",
		[keystone.middleware.api, middleware.cors],
		routes.api.subscribe
	);

	app.get(
		"/api/save-all-artworks",
		[keystone.middleware.api, middleware.cors],
		routes.api.saveAllArtworks
	);

	app.get(
		"/api/upload/:filename",
		[keystone.middleware.api, middleware.cors],
		routes.api.upload
	);

	app.get(
		"/api/viewing-room/:slug",
		[keystone.middleware.api, middleware.cors],
		routes.api.viewingRoom
	);
	app.post(
		"/api/email",
		[keystone.middleware.api, middleware.cors],
		routes.api.email.post
	);

	// app.get(
	//   "/api/content-block/:slug",
	//   [keystone.middleware.api, middleware.cors],
	//   routes.api.contentBlock
	// )

	// app.post('/api/artist', [keystone.middleware.api, keystone.middleware.cors], routes.api.artist.post)
	// app.delete('/api/artist', [keystone.middleware.api, keystone.middleware.cors], routes.api.artist.delete)
};
