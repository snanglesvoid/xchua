$(() => {
    let timePerSlide = 10000

    function nextSlide() {
        $('.slideshow').each(function() {
            let $slideshow = $(this)
            let $active = $(this).find('.active')
            let $next = $active.next().get(0).tagName == 'IMG'
                ? $active.next()
                : $slideshow.find('img:first').next()

            console.log($active, $next)
            $active.fadeOut(() => {
                $active.removeClass('active')
                $next.fadeIn().addClass('active')
            })
        })
    }

    function resizeSlideshow() {
        // console.log('resize')
        // $('.slideshow').each(function() {
        //     let $slideshow = $(this)

        //     console.log($slideshow)
        //     let $active = $slideshow.find('.placeholder')
        //     console.log($active, $active.height())
        //     $slideshow.css({height: $active.height() + 'px'})
        // })
    }

    resizeSlideshow()
    $(window).on('resize', resizeSlideshow)
    setInterval(nextSlide, timePerSlide)
})