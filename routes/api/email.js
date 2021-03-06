const keystone = require("keystone");
const EmailAddress = keystone.list("EmailAddress").model;

var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function validateEmail(email) {
	re.test(String(email).toLowerCase());
}

exports = module.exports = {
	post: async (req, res) => {
		let errors = {};

		if (!req.body["data-agree"]) {
			errors.agree = {
				type: "required",
				error: "Please agree to our data protection policy",
				errorSnippet: "missing-data-agree",
				fieldName: "data-agree",
			};
		}

		try {
			let existing = await EmailAddress.findOne({ email: req.body.email });
			if (existing) {
				console.log("exists", existing);
				return res.status(200).json({
					agree: errors.agree,
				});
			}
		} catch (error) {
			return res.status(500).send(error);
		}

		let validationErrors = {};
		let doc = new EmailAddress();
		let updater = doc.getUpdateHandler(req);

		if (!req.body["data-agree"]) {
			errors.agree = {
				type: "required",
				error: "Please agree to our data protection policy",
				errorSnippet: "missing-data-agree",
				fieldName: "data-agree",
			};
		}

		updater.process(
			req.body,
			{
				flashErrors: false,
				fields: "name, email",
				errorMessage: "There was a problem processing your request",
			},
			function (err) {
				if (err || errors.agree) {
					validationErrors = err ? err.detail : {};
					validationErrors.agree = errors.agree;
					res.status(400).send(validationErrors);
				} else {
					res.status(200).json(validationErrors);
				}
			}
		);
	},
};
