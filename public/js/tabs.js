function openTab(event) {
    let $a = $(event)
    let select = $a.attr('select')
    $a.parent().siblings().removeClass('active')
    $a.parent().addClass('active')

    $('.tab.active').removeClass('active')
    let $tab = $(select)
    $tab.addClass('active')

    location.hash = $tab.attr('id');

    if (window.pack) {
        setTimeout(pack, 50)
    }
}


$(function() {
    let hash = window.location.hash
    if (hash) {
        let $a = $('a[select="' + hash + '"]')
        openTab($a)
    }
})