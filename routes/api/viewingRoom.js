const keystone = require("keystone");

exports = module.exports = async (req, res) => {
	try {
		let query = keystone
			.list("ViewingRoom")
			.model.findOne({
				state: "published",
				slug: req.params.slug,
			})
			.populate("blocks");

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
