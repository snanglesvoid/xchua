function openNav() {
    $('#sidenav').css({
        left:0
    })
    .addClass('open')
    $('#main').css({
        filter: 'brightness(90%) blur(1px)'
    })
    // $('#sidenav-toggle div').animate({
    //     opacity: 0
    // }, 300)
    // $('.letterPath').css({
    //     fill: '#827f80'
    // })
    toggleAnimation()
}

function closeNav() {
    $('#sidenav').css({
        left: '-350px'
    })
    .removeClass('open')
    $('#main').css({
        filter: 'none'
    })
    // $('#sidenav-toggle div').animate({
    //     opacity:1
    // }, 2000)
    // $('.letterPath').css({
    //     fill: '#aaaaaa'
    // })
    toggleAnimation()
}


let open = false
function toggleNav() {
    if (open) {
        closeNav()
        open = false
    }
    else {
        openNav()
        open = true
    }
}

function toggleAnimation() {
    $('#sidenav-toggle').toggleClass('open')
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
    $('.scrollpane-box-shadow-top').css('opacity', 0)

    $('.scrollpane').each(function() {

    })
    
    $('.scrollpane').each(function() {
        let ps = new PerfectScrollbar($(this).get(0), {

        })
        let $sp = $(this)
        $sp.on('ps-y-reach-start', (event) => {
            console.log('ps start')
            $sp.siblings('.scrollpane-box-shadow-top').css('opacity', 0)
        })
        $sp.on('ps-scroll-down', event => {
            console.log('ps down')
            $sp.siblings('.scrollpane-box-shadow-top').css('opacity', 1)
        })
        $sp.on('ps-scroll-up', event => {
            console.log('ps up')
            $sp.siblings('.scrollpane-box-shadow').css('opacity', 1)
        })
        $sp.on('ps-y-reach-end', event => {
            console.log('ps end')
            $sp.siblings('.scrollpane-box-shadow').css('opacity', 0)
        })
        pss.push(ps)
    })

    $(window).resize(() => {
        pss.forEach(x => x.update())
    })
}

$(initScrollbar)