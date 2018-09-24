function openNav() {
    $('#sidenav').css({
        left:0
    })
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