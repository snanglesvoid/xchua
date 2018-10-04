function pack() {
    $('.grid').packery({
        itemSelector: '.grid-item',
        gutter: 8,
    });
    $('.grid-h').packery({
        itemSelector: '.grid-item',
        gutter: 8,
        isHorizontal: true
    })
}
$(() => {

    $('.grid').imagesLoaded(pack)
    $('.grid-h').imagesLoaded(pack)
    $(window).on('resize', pack)

})