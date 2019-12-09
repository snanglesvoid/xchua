const keystone = require("keystone");

exports = module.exports = async (req, res) => {
	try {
		let query = keystone
			.list("Exhibition")
			.model.find({ state: "published" })
			.populate("artists", "-biography")
			.populate("artworks", { match: { state: "published" } })
			.populate("location")
			.sort("-date.start");

		if (req.params.artistId) {
			query.where({
				artists: req.params.artistId
			});
		}

		let docs = await query.exec();

		res.json(docs);
	} catch (error) {
		console.error(error);
		res.status(500).send(error);
	}
};
