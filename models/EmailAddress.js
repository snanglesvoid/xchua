const keystone = require("keystone");
const Types = keystone.Field.Types;

const EmailAddress = new keystone.List("EmailAddress", {
	email: { type: Types.Email, noedit: true },
	updatedAt: { type: Types.Datetime, noedit: true, default: Date.now },
});

EmailAddress.schema.pre("save", function (next) {
	this.updatedAt = new Date();
	next();
});

EmailAddress.register();
