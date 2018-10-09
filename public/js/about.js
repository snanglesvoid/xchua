let $about
let $spaces
let $scrollpane

function scrollToSection(event) {
    let $a = $(event)
    let select = $a.attr('select')
    let $section = $(select)
    let top = 0
    if (select == '#about') {
        top = 0
    }
    else if (select == '#spaces') {
        top = $about.height()
    }

    $scrollpane.animate({
        'scrollTop' : top
    }, 500)

    $a.parent().siblings().removeClass('active')
    $a.parent().addClass('active')

    // location.hash = $section.attr('id')
}

$(function() {
    $about = $('#about')
    $spaces = $('#spaces')
    $scrollpane = $('#mainScrollpane')

    // let hash = window.location.hash

    // if (hash) {
    //     let $a = $('a[select="' + hash + '"]')
    //     scrollToSection($a)
    // }

    $scrollpane.on('ps-scroll-y', function(event) {
        let top = $scrollpane.scrollTop()

        if (top == 0) {
            $scrollpane.siblings('.scrollpane-box-shadow-top').css('opacity', 0)
        }

        if (top < $about.height() - 20) {
            $('a[select="#about"]').parent().addClass('active')
            $('a[select!="#about"]').parent().removeClass('active')
            // window.location.hash = '#about'
        }
        else {
            $('a[select="#spaces"]').parent().addClass('active')
            $('a[select!="#spaces"]').parent().removeClass('active')
            // window.location.hash = '#spaces'
        }
    })
})