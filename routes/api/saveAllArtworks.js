const keystone = require('keystone')

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

exports = module.exports = async (req, res) => {
    let artworks = await keystone.list('Artwork').model.find()

    let log = {
        data: {},
        found: artworks.length
    }
    try {
        await asyncForEach(artworks, async (artwork) => {
            console.log(artwork)
            await artwork.save()
            log.data[artwork.slug] = artwork
        })
    }
    catch(error) {
        log.error = error
    }
    finally {
        log.saved = Object.keys(log.data).length
        res.json(log)
    }
}