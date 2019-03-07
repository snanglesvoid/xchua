$(() => {
    let timePerSlide = 6000


    function nextSlide() {
        $('.front-slideshow').each(function() {

            let $slideshow = $(this)
            let $active = $slideshow.find('.active')
            if (!$active.next()) { return }
            let $next = $active.next().get(0).tagName == 'IMG'
                ? $active.next()
                : $slideshow.find('img:first').next()
            let title = $next.attr('title')
            let caption = $next.attr('caption')
            let subtitle = $next.attr('subtitle')
            let url = $next.attr('url')
            let placement = $next.attr('placement')
            let color = $next.attr('color')
            let $title = $slideshow.find('.slideshow-title')

            // console.log('color', color)

            $title.fadeOut(500, () => {
                $title.removeClass('left')
                $title.removeClass('right')
                $title.removeClass('center')
                $title.removeClass('top')
                $title.removeClass('dark')
                $title.removeClass('bright')
                $title.addClass(placement)
                $title.addClass(color)
                
                let cColor = color == 'custom' ? $next.attr('customColor') : ''
                $title.find('.title > a').css('color', cColor)
                $title.find('.caption').css('color', cColor)
                $title.find('.subtitle').css('color', cColor)
    
                $title.find('.title > a').html(title).attr('href', url)
                $title.find('.caption').html(caption)
                $title.find('.subtitle').html(subtitle)
                $title.fadeIn(500)
            })

            $next.fadeIn(1000).addClass('active')
            $active.fadeOut(1000, () => {
                $active.removeClass('active')
            })
        })
    }
    
    setInterval(nextSlide, timePerSlide)

    $('#logo').css({
        'animation-name' : 'bloat',
        'animation-duration' : '2.5s',
        'animation-timing-function' : 'ease-out'
    })
})