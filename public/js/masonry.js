$(() => {

    function pack() {
        $('.grid').packery({
            itemSelector: '.grid-item',
            gutter: 5,
        });
    }
    $('.grid').imagesLoaded(pack)
    $(window).on('resize', pack)
})