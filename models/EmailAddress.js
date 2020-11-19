const keystone = require("keystone");
const Types = keystone.Field.Types;

const EmailAddress = new keystone.List("EmailAddress", {
	nocreate: true,
	noedit: true,
});

EmailAddress.add({
	name: { type: Types.Name, required: true },
	email: { type: Types.Email, required: true, unique: true, index: true },
	createdAt: { type: Types.Datetime, default: Date.now },
});

EmailAddress.defaultSort = "-createdAt";
EmailAddress.defaultColumns = "name, email, createdAt";
EmailAddress.register();
