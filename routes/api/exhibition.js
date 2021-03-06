const keystone = require("keystone");

exports = module.exports = async (req, res) => {
	try {
		let query = keystone
			.list("Exhibition")
			.model.findOne({
				state: "published",
				slug: req.params.slug,
			})
			.populate("artists")
			.populate({ path: "artworks", match: { state: "published" } })
			.populate("location");

		let doc = await query.exec();

		if (!doc) {
			res.status(404).send("not found");
		} else {
			res.json(doc);
		}
	} catch (error) {
		res.status(500).send(error);
	}
};
