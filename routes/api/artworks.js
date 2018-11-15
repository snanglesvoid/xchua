const Router = require('express').Router

const router = Router()

router.get('/', (req, res) => {
    res.json({msg: 'hello world'})
})


exports = module.exports = router