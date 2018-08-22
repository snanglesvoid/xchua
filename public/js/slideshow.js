$(() => {
    let timePerSlide = 10000

    function nextSlide() {
        $('.front-slideshow').each(function() {

            let $slideshow = $(this)
            let $active = $slideshow.find('.active')
            let $next = $active.next().get(0).tagName == 'IMG'
                ? $active.next()
                : $slideshow.find('img:first').next()
            let title = $next.attr('title')
            let caption = $next.attr('caption')
            let url = $next.attr('url')
            let placement = $next.attr('placement')
            let color = $next.attr('color')
            let $title = $slideshow.find('.slideshow-title')

            console.log('color', color)

            $title.fadeOut(500, () => {
                $title.removeClass('left')
                $title.removeClass('right')
                $title.removeClass('center')
                $title.removeClass('top')
                $title.removeClass('dark')
                $title.removeClass('bright')
                $title.addClass(placement)
                $title.addClass(color)
                $title.find('.title > a').html(title).attr('href', url)
                $title.find('.caption').html(caption)
                $title.fadeIn(500)
            })

            $next.fadeIn(1000).addClass('active')
            $active.fadeOut(1000, () => {
                $active.removeClass('active')
            })
        })
    }
    
    setInterval(nextSlide, timePerSlide)
})