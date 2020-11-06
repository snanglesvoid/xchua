const keystone = require("keystone");
const EmailAddress = keystone.list("EmailAddress").model;

var emailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function validateEmail(email) {
	re.test(String(email).toLowerCase());
}

exports = module.exports = {
	post: (req, res) => {
		let email = String(req.body.email).toLowerCase();
		if (validateEmail(email)) {
			let doc = new EmailAddress({ email: email });
			doc.save((err) => {
				if (err) {
					res.status(500).send("internal server error");
				} else {
					res.status(200).send("email saved");
				}
			});
		} else {
			res.status(400).send("invalid email");
		}
	},
};
