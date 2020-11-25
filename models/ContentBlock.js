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
		options: "Title Image, Artwork Display, Text, Video",
		default: "Title Image",
	},
	image: {
		type: Types.CloudinaryImage,
		dependsOn: { type: ["Title Image"] },
	},
	headline: {
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
	text: {
		english: {
			type: Types.Html,
			wysiwyg: true,
			height: 150,
			dependsOn: { type: ["Text", "Title Image"] },
		},
		chinese: {
			type: Types.Html,
			wysiwyg: true,
			height: 150,
			dependsOn: { type: ["Text", "Title Image"] },
		},
		german: {
			type: Types.Html,
			wysiwyg: true,
			height: 150,
			dependsOn: { type: ["Text", "Title Image"] },
		},
	},
	artworks: {
		type: Types.Relationship,
		ref: "Artwork",
		many: true,
		dependsOn: { type: ["Artwork Display"] },
	},
	layout: {
		type: Types.Select,
		options: "Image Left, Image Right, Columns",
		default: "Image Left",
		dependsOn: { type: ["Artwork Display"] },
	},
	textColor: {
		type: Types.Select,
		options: ["bright", "dark", "custon"],
		default: "dark",
		dependsOn: { type: "Title Image" },
	},
	customColor: {
		type: Types.Text,
		dependsOn: { textColor: "custom" },
	},
	vimeoLink: {
		type: Types.Url,
		dependsOn: { type: "Video" },
	},
});

ContentBlock.schema.pre("save", function (next) {
	this.updatedAt = new Date();
	next();
});

ContentBlock.register();
