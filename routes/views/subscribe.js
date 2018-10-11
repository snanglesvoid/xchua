const keystone = require('keystone')
const request = require('superagent')

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

exports = module.exports = (req, res) => {
    let view = new keystone.View(req, res)
    let locals = res.locals

    locals.section = 'subscribe'
    locals.formData = req.body || {}
    locals.validationErrors = {}
    locals.subscribed = false

    let api_key = process.env.MAILCHIMP_API_KEY
    let list_id = process.env.MAILCHIMP_LIST_ID

    view.on('post', { action: 'subscribe'}, function(next) {
        console.log(req.body)

        if (!validateEmail(req.body.email)) {
          locals.validationErrors.email = 'invalid email'
          return next()
        }
        if (!req.body.firstname) {
          locals.validationErrors.firstname = true
          return next()
        }
        if (!req.body.lastname) {
          locals.validationErrors.lastname = true
          return next()
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
          .end(function(err, response) {
              if (response.status < 300 || (response.status === 400 && response.body.title === "Member Exists")) {
                locals.subscribed = true
                locals.response = JSON.stringify(response.body)
                next(null)
              } else {
                console.error(err)
                next(err)
              }
          });
    })

    view.render('subscribe')
}