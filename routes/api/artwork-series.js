const keystone = require("keystone");
const _ = require("lodash");

exports = module.exports = async (req, res) => {
	try {
		let query = keystone
			.list("ArtworkSeries")
			.model.find()
			.populate("artworks", { match: { state: "published" } })
			.populate("selectedWork");

		if (req.params.artistId) {
			query.where({ artist: req.params.artistId });
		}

		let series = await query.exec();

		if (req.params.artistId) {
			let artworksQuery = keystone.list("Artwork").model.find({
				artist: req.params.artistId,
				_id: { $nin: _.flatMap(series, s => s.artworks).map(x => x._id) }
			});
			let artworks = await artworksQuery.exec();
			console.log("artworks: ", artworks.length);
			if (artworks.length > 0) {
				series = [
					...series,
					{
						title: {
							english:
								series.length == 0 ? "artist-selected-works" : "more-series"
						},
						artist: req.params.artistId,
						artworks: artworks,
						selectedWork: artworks[0]
					}
				];
			}
		}

		res.json(series);
	} catch (error) {
		console.error(error);
		res.status(500).send(error);
	}
};
