const keystone = require('keystone')
const Enquiry = keystone.list('Enquiry')

exports = module.exports = (req, res) => {
    let validationErrors = {}

    let enquiry = new Enquiry.model()
    let updater = enquiry.getUpdateHandler(req)

    let errors = {}

    if (!req.body['data-agree']) {
        errors.agree = {
            type: 'required',
            error: 'Please agree to our data protection policy',
            errorSnippet: 'missing-data-agree',
            fieldName: 'data-agree'
        }
    }

    updater.process(req.body, {
        flashErrors: false,
        fields: 'name, email, phone, message',
        errorMessage: 'There was a problem submitting your enquiry'
    }, function(err) {
        if (err || errors.agree) {
            validationErrors = err ? err.detail : {}
            validationErrors.agree = errors.agree
            res.status(400).send(validationErrors)
        }
        else {
            res.status(200).json(validationErrors)
        }
    })
}