const keystone = require("keystone");
const Types = keystone.Field.Types;

const ViewingRoom = new keystone.List("ViewingRoom", {
	autokey: { path: "slug", from: "title.english", unique: true },
	map: { name: "title.english" },
});

ViewingRoom.add({
	title: {
		english: { type: Types.Text, required: true, index: true },
		chinese: { type: Types.Text },
		german: { type: Types.Text },
	},
	state: {
		type: Types.Select,
		options: "draft, published, archived",
		default: "draft",
		index: true,
	},
	updatedAt: { type: Types.Datetime, noedit: true, default: Date.now },
	blocks: { type: Types.Relationship, ref: "ContentBlock", many: true },
});

ViewingRoom.defaultColumns = "title.english, state, updatedAt";

ViewingRoom.schema.pre("save", function (next) {
	this.updatedAt = new Date();
	next();
});

ViewingRoom.register();
