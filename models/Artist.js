const keystone = require("keystone");
const Types = keystone.Field.Types;

const storage = new keystone.Storage({
	adapter: keystone.Storage.Adapters.FS,
	fs: {
		path: keystone.expandPath("./public/uploads/"),
		publicPath: "/public/uploads"
	}
});

const Artist = new keystone.List("Artist", {
	autokey: { path: "slug", from: "name.english", unique: true },
	map: { name: "name.english" },
	defaultSort: "-listPriority"
});

Artist.add({
	name: {
		english: { type: Types.Name, required: true, index: true },
		chinese: { type: Types.Name }
	},
	state: {
		type: Types.Select,
		options: "draft, published, archived",
		default: "draft",
		index: true
	},
	artistType: {
		type: Types.Select,
		options: "resident, guest",
		default: "resident",
		index: true
	},
	updatedAt: { type: Types.Datetime, noedit: true, default: Date.now },
	biography: {
		english: { type: Types.Html, wysiwyg: true, height: 400 },
		chinese: { type: Types.Html, wysiwyg: true, height: 400 },
		german: { type: Types.Html, wysiwyg: true, height: 400 }
	},
	cvUpload: { type: Types.File, storage: storage },
	picture: { type: Types.CloudinaryImage },
	thumbnail: { type: Types.CloudinaryImage },
	selectedWork: { type: Types.Relationship, ref: "Artwork" },
	listPriority: { type: Number, default: 0 }
});

Artist.relationship({ ref: "Artwork", path: "artworks", refPath: "artist" });
Artist.relationship({
	ref: "ArtworkSeries",
	path: "series",
	refPath: "artist"
});
Artist.relationship({
	ref: "Exhibition",
	path: "exhibitions",
	refPath: "artists"
});
Artist.relationship({ ref: "Fair", path: "fairs", refPath: "artists" });

Artist.defaultColumns =
	"name.english, thumbnail|20%, artistType|10%, state|10%, updatedAt|20%";

Artist.schema.pre("save", function(next) {
	this.updatedAt = new Date();
	next();
});

Artist.register();
