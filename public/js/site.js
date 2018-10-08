function openNav() {
    $('#sidenav').css({
        left:0
    })
    .addClass('open')
    $('#main').css({
        filter: 'brightness(90%) blur(1px)'
    })
    $('#sidenav-toggle div').animate({
        opacity: 0
    }, 300)
    // $('.letterPath').css({
    //     fill: '#827f80'
    // })
}

function closeNav() {
    $('#sidenav').css({
        left: '-350px'
    })
    .removeClass('open')
    $('#main').css({
        filter: 'none'
    })
    $('#sidenav-toggle div').animate({
        opacity:1
    }, 2000)
    // $('.letterPath').css({
    //     fill: '#aaaaaa'
    // })
}

$(() => {
    console.log('site loaded')

    $("a[keep-lang]").click(function(e) {
        e.preventDefault()

        let urlParams = new URLSearchParams(window.location.search)
        let lang = urlParams.get('lang')
        let dest = $(this).attr('href')
        if (lang) dest += `?lang=${lang}`

        setTimeout(function() {
            window.location.href = dest
        }, 50)
    })

    $("a[switch-lang]").click(function(e) {
        e.preventDefault()

        let lang = $(this).attr('switch-lang')
        let dest = `${window.location.href.split('?')[0]}?lang=${lang}`

        setTimeout(function() {
            window.location.href = dest
        }, 50)
    })
    
})

function setLogoColor(color) {
    $('#logo svg .letterPath').css('fill', color)
}

$(function() {
    setLogoColor('grey')
})

let pss = []
function initScrollbar() {
    pss.forEach(x => x.destroy())
    
    $('.scrollpane').after(`
        <div class="scrollpane-box-shadow"></div>
        `)
    $('.scrollpane.top').after(`
        <div class="scrollpane-box-shadow-top"></div>    
    `)
    $('.scrollpane-horizontal').after(`
        <div class="scrollpane-box-shadow-side"></div>
    `)

    $('.scrollpane').each(function() {

    })
    
    $('.scrollpane').each(function() {
        let ps = new PerfectScrollbar($(this).get(0), {

        })
        pss.push(ps)
    })

    $(window).resize(() => {
        pss.forEach(x => x.update())
    })
}

$(initScrollbar)