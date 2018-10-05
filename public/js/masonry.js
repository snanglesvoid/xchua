function pack() {
    $('.grid').packery({
        itemSelector: '.grid-item',
        gutter: 12,
    });
    $('.grid-h').packery({
        itemSelector: '.grid-item',
        gutter: 12,
        isHorizontal: true
    })
}
$(() => {

    $('.grid').imagesLoaded(pack)
    $('.grid-h').imagesLoaded(pack)
    $(window).on('resize', pack)

})