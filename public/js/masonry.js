$(() => {

    function pack() {
        $('.grid').packery({
            itemSelector: '.grid-item',
            gutter: 10,
        });
    }
    $('.grid').imagesLoaded(pack)
    $(window).on('resize', pack)
})