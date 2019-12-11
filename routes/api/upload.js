const keystone = require("keystone");
const fs = require("fs");

exports = module.exports = async (req, res) => {
	let filename = req.params.filename;

	let path = keystone.expandPath("./public/uploads/" + filename);

	fs.createReadStream(path).pipe(res);
};
