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
    $('.letterPath').css({
        fill: '#827f80'
    })
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
    $('.letterPath').css({
        fill: '#aaaaaa'
    })
}

$(() => {
    console.log('site loaded')
    $(window).resize(backdropFilters)
    // backdropFilters()
})


function backdropFilters() {
    html2canvas(document.body).then(function (canvas) {
        $('.backdrop').css({
            "background-image": 'url(' + canvas.toDataURL("image/png") + ')',
            "filter": "invert(1)",
            "opacity": "1"
        });
    });
}