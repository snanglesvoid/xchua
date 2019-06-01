const keystone = require('keystone')
const request = require('superagent')

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

exports = module.exports = (req, res) => {
    let validationErrors = {
        error: false
    }

    let api_key = process.env.MAILCHIMP_API_KEY
    let list_id = process.env.MAILCHIMP_LIST_ID

    if (!validateEmail(req.body.email)) {
        validationErrors.email = {type: 'invalid'}
        validationErrors.error = true
    }
    if (!req.body.firstname) {
        validationErrors.firstname = {type: 'required'}
        validationErrors.error = true
    }
    if (!req.body.lastname) {
        validationErrors.lastname = {type: 'required'}
        validationErrors.error = true
    }
    if (!req.body['data-agree']) {
        validationErrors.agree = {type: 'required'}
        validationErrors.error = true
    }

    if (validationErrors.error) {
        return res.status(400).send(validationErrors)
    }

    let data = {
        "email_address": req.body.email,
        "status": "subscribed",
        "merge_fields": {
            "FNAME": req.body.firstname,
            "LNAME": req.body.lastname,
        }
    }

    request
        .post('https://us17.api.mailchimp.com/3.0/lists/' + list_id + '/members/')
        .set('Content-Type', 'application/json;charset=utf-8')
        .set('Authorization', 'Basic ' + new Buffer('any:' + api_key ).toString('base64'))
        .send(data)
        .end((err, response) => {
            if (response.status === 400 && response.body.title === "Member Exists") {
                res.json({
                    status: 'subscribe-already-subscribed',
                    response: JSON.stringify(response.body)
                })
            }
            else if (response.status < 300) {
               res.json({
                   status: 'subscribe-subscribed',
                   response: JSON.stringify(response.body)
               })
            } else {
                res.status(500).send(err)
            }
        })
          
}