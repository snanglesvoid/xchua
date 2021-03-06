const keystone = require("keystone");

exports = module.exports = {
	get: async (req, res) => {
		try {
			let query = keystone
				.list("ViewingRoom")
				.model.findOne({
					state: "published",
					slug: req.params.slug,
				})
				.populate({
					path: "blocks",
					populate: {
						path: "artworks",
						model: "Artwork",
					},
				});

			let doc = await query.exec();

			if (!doc) {
				res.status(404).send("not found");
			} else {
				res.json([doc]);
			}
		} catch (error) {
			res.status(500).send(error);
		}
	},
	getAll: async (req, res) => {
		try {
			let query = keystone
				.list("ViewingRoom")
				.model.find({ state: "published" })
				.populate({
					path: "blocks",
				});

			let docs = await query.exec();

			res.json(docs || []);
		} catch (error) {
			res.status(500).send(error);
		}
	},
};
