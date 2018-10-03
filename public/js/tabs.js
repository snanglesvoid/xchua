function openTab(event) {
    let $a = $(event)
    let select = $a.attr('select')
    $a.parent().siblings().removeClass('active')
    $a.parent().addClass('active')

    $('.tab.active').removeClass('active')
    let $tab = $(select)
    $tab.addClass('active')

    if(history.pushState) {
        history.pushState(null, null, '#' + $tab.attr('id'));
    }
    else {
        location.hash = $tab.attr('id');
    }
}


$(function() {
    let hash = window.location.hash
    if (hash) {
        let $a = $('a[select="' + hash + '"]')
        openTab($a)
    }
})