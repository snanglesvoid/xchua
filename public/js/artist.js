function openTab(event) {
    console.log(event)
    let $a = $(event)
    let tabName = $a.html().toLowerCase()
    $a.parent().siblings().removeClass('active')
    $a.parent().addClass('active')

    $('.tab.active').removeClass('active')
    $(`#${tabName}`).addClass('active')
}


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