var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = '';

	view.query('images', 
		keystone.list('FrontPageImage').model.find({
			active: true
		}).sort('-listPriority')
	)

	// Render the view
	view.render('index');
};
