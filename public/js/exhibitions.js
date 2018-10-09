let $upcoming
let $current
let $past
let $scrollpane

function scrollToSection(event) {
    let $a = $(event)
    let select = $a.attr('select')
    let $section = $(select)
    let top = 0
    if (select == '#upcoming') {
        top = 0
    }
    else if (select == '#current') {
        top = $upcoming.height() - 10
    }
    else {
        top = $upcoming.height() + $current.height() - 10
    }

    $scrollpane.animate({
        'scrollTop': top
    }, 500)
    $a.parent().siblings().removeClass('active')
    $a.parent().addClass('active')
    location.hash = $section.attr('id')
}

function filter(location) {

}


$(function() {
    $upcoming = $('#upcoming')
    $current = $('#current')
    $past = $('#past')
    $scrollpane = $('#mainScrollpane')
    let hash = window.location.hash
    if (hash) {
        let $a = $('a[select="' + hash + '"]')
        scrollToSection($a)
    }

    $scrollpane.on('ps-scroll-y', function(event) {
        let top = $scrollpane.scrollTop()
        // console.log(top)
        console.log(top)
        if (top == 0) {
            $scrollpane.siblings('.scrollpane-box-shadow-top').css('opacity', 0)
        }
        if (top < $upcoming.height() - 20) {
            $('a[select="#upcoming"]').parent().addClass('active')
            $('a[select!="#upcoming"]').parent().removeClass('active')
            window.location.hash = '#upcoming'
        }
        else if (top < $upcoming.height() + $current.height() - 20) {
            $('a[select="#current"]').parent().addClass('active')
            $('a[select!="#current"]').parent().removeClass('active')
            window.location.hash = '#current'
        }
        else {
            $('a[select="#past"]').parent().addClass('active')
            $('a[select!="#past"]').parent().removeClass('active')
            window.location.hash = '#past'
        }
    })
})