const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const pug = require('pug')

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(logger('dev'))

app.set('view engine', 'pug')

app.use(express.static('public'))
app.use(express.static('editable-images'))

//init locals
app.use((req, res, next) => {
    if (!res.locals) {
        res.locals = {}
    }

    //TODO database for artists
    res.locals.artistLinks = [
        { name:'artist1', path: '/artist/artist1', label: 'Artist 1'},
        { name:'artist2', path: '/artist/artist2', label: 'Artist 2'},
    ]

    res.locals.showFooter = true
    next()
})

app.get('/', (req, res) => {
    res.locals.section = 'home'
    res.render('index')
})

app.get('/about', (req, res) => {
    res.locals.section = 'more'
    res.render('about')
})

app.get('/artists', (req, res) => {
    res.locals.section = 'artists'
    res.render('artists')
})

app.get('/artist/:artistId', (req, res) => {
    res.locals.section = 'artists'
    res.locals.artist = {
        name: req.params.artistId
    }
    res.render('artist')
})

app.get('/fairs', (req, res) => {
    res.locals.section = 'fairs'
    res.render('fairs')
})

app.get('/contact', (req, res) => {
    res.locals.section = 'more'
    res.render('contact')
})

app.get('/publications', (req, res) => {
    res.locals.section = 'more'
    res.render('publications')
})

app.get('/publication/:publicationId', (req, res) => {
    res.locals.section = 'more'
    res.render('publication')
})

app.get('/exhibitions/current', (req, res) => {
    res.locals.section = 'exhibitions'
    res.render('current-exhibitions')
})

app.get('/exhibitions/archive', (req, res) => {
    res.locals.section = 'exhibitions'
    res.render('archived-exhibitions')
})

app.get('/wechat', (req, res) => {
    res.locals.section = ''
    res.render('wechat')
})

let admin = require('./admin/router.js')
app.use('/admin', admin)


app.listen(3000, err => {
    console.log('listening on port 3000')
})
