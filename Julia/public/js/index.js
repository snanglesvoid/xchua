$(() => {

    let timePerSlide = 10000 //ms

    function nextGalleryImage() {
        let $active = $('#gallery .active')
        let $next = $active.next().get(0).tagName == 'IMG'
            ? $active.next()
            : $('#gallery img:first').next()

        console.log($active, $next)
        $active.fadeOut(() => {
            $active.removeClass('active')
            $next.fadeIn().addClass('active')
        })
    }

    function resizeGallery() {
        let $active = $('#gallery .placeholder')
        $('#gallery').css({height: $active.height() + 'px'})
    }

    resizeGallery()

    $(window).on('resize', resizeGallery)

    setInterval(nextGalleryImage, timePerSlide)

    openingAnimation()

})


function openingAnimation() {
    $('#gallery').css({opacity:0})
    $('#sidenav-toggle div').css({opacity: 0})
    $('#logo svg').css({width:'100%', height: '100%', opacity: 0})


    $('#logo svg').animate({opacity: 1}, 1000)

    setTimeout(() => {
        
        $('#logo svg').animate({
            width: '140px',
            height: '48px'
        }, 1000, () => {
            // $('.letterPath').css({
            //     fill: '#aaaaaa'
            // })
            $('#gallery').animate({
                opacity: 1
            }, 1000)
            $('#sidenav-toggle div').animate({
                opacity: 1
            }, 1000, () => {
            //    backdropFilters()
            })
        })
    }, 800)

    // $('.letterPath').each(function() {
    //     $(this).css('angle', 0)
    //         .animate({
    //             angle: 360
    //         }, {
    //             duration: 2000,
    //             step: function(v1) {
    //                 console.log('step', v1)
    //                 console.log(this)
    //                 $(this).attr('transform', `rotate(${v1})`)
    //             }
    //         })
    // })
}
