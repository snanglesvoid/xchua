let $about
let $spaces
let $scrollpane

function scrollToSection(event) {
    let $a = $(event)
    let select = $a.attr('select')
    let $section = $(select)
    let top = 0
    if (select == '#spaces') {
        top = 0
    }
    else if (select == '#about') {
        top = $spaces.height()
    }

    $scrollpane.animate({
        'scrollTop' : top
    }, 500)

    $a.parent().siblings().removeClass('active')
    $a.parent().addClass('active')
}

$(function() {
    $about = $('#about')
    $spaces = $('#spaces')
    $scrollpane = $('#mainScrollpane')


    let $aboutlink = $('a[select="#about"]').parent()
    let $spaceslink =  $('a[select="#spaces"]').parent()
    
    $scrollpane.on('ps-scroll-y', function(event) {
        let top = $scrollpane.scrollTop()
        console.log(top, $spaces.height() - 200)
        if (top > $spaces.height() - 200) {
            $aboutlink.addClass('active')
            $spaceslink.removeClass('active')
        }
        else {
            $spaceslink.addClass('active')
            $aboutlink.removeClass('active')
        }

        if (top == 0) {
            $scrollpane.siblings('.scrollpane-box-shadow-top').css('opacity', 0)
        }
    })
})