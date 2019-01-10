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
    // location.hash = $section.attr('id')
}

function filter(location) {

}


$(function() {
    $upcoming = $('#upcoming')
    $current = $('#current')
    $past = $('#past')
    $scrollpane = $('#mainScrollpane')
    
    let pauseInterval = true
    let pauseIntervalTimeout

    $scrollpane.on('ps-scroll-y', () => {
        if (pauseIntervalTimeout) clearTimeout(pauseIntervalTimeout)
        pauseInterval = false;
        pauseIntervalTimeout = setTimeout(() => { 
            pauseInterval = true 
            pauseIntervalTimeout = null
        }, 2000)
    })

    $($('.tabs').children().get(0)).addClass('active')

    let $ta = $('.tabs a').parent()
    let $au = $('.tabs a[select="#upcoming"]').parent()
    let $ac = $('.tabs a[select="#current"]').parent()
    let $ap = $('.tabs a[select="#past"]').parent()

    setInterval(function() {
        if (pauseInterval) return
        let top = $scrollpane.scrollTop()
        if (top == 0) {
            $scrollpane.siblings('.scrollpane-box-shadow-top').css('opacity', 0)
        }
        if (top < $upcoming.height() - 20) {
            $ta.removeClass('active')
            $au.addClass('active')
            // window.location.hash = '#upcoming'
        }
        else if (top < $upcoming.height() + $current.height() - 20) {
            $ta.removeClass('active')
            $ac.addClass('active')
            // window.location.hash = '#current'
        }
        else {
            $ta.removeClass('active')
            $ap.addClass('active')
            // window.location.hash = '#past'
        }
    }, 200)
})