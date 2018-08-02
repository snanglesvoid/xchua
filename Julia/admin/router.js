const fs = require('fs')
const path = require('path')
const express = require('express')
const upload = require('multer')({
    dest: './tmp-uploads'
})
const jimp = require('jimp')

const sqlite3 = require('sqlite3').verbose()
const file = 'db'
const db = new sqlite3.Database(file)

const router = express.Router()

router.use((req, res, next) => {
    //TODO user authentication
    next()
})

router.get('/', (req, res) => {
    res.locals.section = 'home'
    fs.readdir('./editable-pages/artists', (err, files) => {
        if (err) {
            console.error(err)
            return res.json(err)
        }
        console.log(files)
        res.locals.artists = files
        res.render('admin/index')
    })
})

router.get('/edit-page/:pageName', (req, res) => {
    res.locals.section = 'edit-page'
    fs.readFile(`./editable-pages/artists/${req.params.pageName}`, 'utf-8', (err, data) => {
        if (err) {
            console.error(err)
            return res.json(err)
        }
        res.locals.pageName = req.params.pageName
        res.locals.htmlContent = data
        res.render('admin/edit-page')
    })
})

router.post('/save-page', (req, res) => {
    console.log('save page', req.body)
    Object.keys(req.body).forEach(key => {
        fs.writeFile(`./editable-pages/artists/${key}`, req.body[key], (err) => {
            if (err) {
                console.error(err)
                return res.status(500).contentType('application/json').end(err)
            }
            res.json('ok')
        })
    })
})

router.get('/delete-page/:pageName', (req, res) => {
    fs.unlink(`./editable-pages/artists/${req.params.pageName}`, err => {
        if (err) {
            return res.status(500).contentType('application/json').end(err)
        }
        res.redirect('/admin')
    })
})

router.post('/upload-image',  upload.single('image'), (req, res) => {
    let file = req.file
    let tempPath = file.path
    let filename = `${new Date().toDateString().replace(/\s/g,"-")}_${makeid()}_${file.originalname.replace(/\s/g, "")}`
        // .replace(/\.[^/.]+$/, "") + '.jpg' //if should compress images
    let targetPath = './editable-images/' + filename


    jimp.read(tempPath)
        .then(x => {
            x.quality(100).write(targetPath, (err) => {
                if (err) {
                    res.status(500).contentType('text/plain').end('Oops something went wrong')
                }
                else {
                    res.json({
                        size: [600,400],
                        url: '/' + filename
                    })
                }
                fs.unlink(tempPath, console.error)
            })
        })
        .catch(err => {
            res.status(500).contentType('text/plain').end('Oops something went wrong')
        })
})

router.post('/insert-image', upload.any(), (req, res) => {
    console.log(req.body)
    res.json({size: [600,400], url: req.body.url, alt: ''})
})

router.post('/delete-image', (req, res) => {
    let filename = req.body.filename
    fs.unlink(`./editable-images/${filename}`)
        .then(x => {
            res.json('file was deleted')
        })
        .catch(err => {
            res.status(500).contentType('application/json').end(err)
        })
})

exports = module.exports = router


function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
}