const keystone = require("keystone");
const Types = keystone.Field.Types;

const ContentBlock = new keystone.List("ContentBlock", {
	autokey: { path: "slug", from: "title.english", unique: true },
	map: { name: "title.english" },
});
ContentBlock.add({
	title: {
		english: { type: Types.Text, required: true, index: true },
	},
	updatedAt: { type: Types.Datetime, noedit: true, default: Date.now },
	type: {
		type: Types.Select,
		options: "Title Image, Artwork Display, Text, Quote",
		default: "Title Image",
	},
	image: {
		type: Types.CloudinaryImage,
		dependsOn: { type: ["Title Image", "Quote"] },
	},
	healine: {
		english: {
			type: Types.Text,
			dependsOn: { type: "Title Image" },
		},
		chinese: {
			type: Types.Text,
			dependsOn: { type: "Title Image" },
		},
		german: {
			type: Types.Text,
			dependsOn: { type: "Title Image" },
		},
	},
	// subtitle: {
	// 	english: {
	// 		type: Types.Text,
	// 		dependsOn: { type: "Title Image" },
	// 	},
	// 	chinese: {
	// 		type: Types.Text,
	// 		dependsOn: { type: "Title Image" },
	// 	},
	// 	german: {
	// 		type: Types.Text,
	// 		dependsOn: { type: "Title Image" },
	// 	},
	// },
	text: {
		english: {
			type: Types.Html,
			wysiwyg: true,
			height: 150,
			dependsOn: { type: ["Text", "Quote", "Title Image"] },
		},
		chinese: {
			type: Types.Html,
			wysiwyg: true,
			height: 150,
			dependsOn: { type: ["Text", "Quote"] },
		},
		german: {
			type: Types.Html,
			wysiwyg: true,
			height: 150,
			dependsOn: { type: ["Text", "Quote"] },
		},
	},
	artworks: {
		type: Types.Relationship,
		ref: "Artwork",
		many: true,
		dependsOn: { type: ["Artwork Display"] },
	},
});

ContentBlock.schema.pre("save", function (next) {
	this.updatedAt = new Date();
	next();
});

ContentBlock.register();
