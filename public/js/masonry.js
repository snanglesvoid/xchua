function pack(t, initial) {
    if (initial) {
        $('.grid-item').css('opacity', 0)
    }
    $('.grid').packery({
        itemSelector: '.grid-item',
        gutter: 12,
        transitionDuration: t || 400,
        // stagger: 50,
    });
    $('.grid-h').packery({
        itemSelector: '.grid-item',
        gutter: 12,
        isHorizontal: true,
        transitionDuration: t || 400,
        // stagger: 50,
    })
    if (initial) {
        $('.grid-item').animate({opacity:  1}, 500)
    }
}
$(() => {

    pack(1, true)
    $('.grid').imagesLoaded(pack)
    $('.grid-h').imagesLoaded(pack)
    $(window).on('resize', () => setTimeout(pack,800))

})

$(() => {

    $('.series').each(function() {
        let $series = $(this)
        // console.log($series)
        let $selectedWork = $series.find('.selected-work')
        let $worksDetail = $series.find('.works-detail')
        let $closeBtn = $series.find('.close-btn')
        let $seriesTitle = $series.find('.series-title').find('h3')
        // let open = false
        let titleHeight = $series.find('.series-title').height()
        $(window).resize(() => {
            titleHeight = $series.find('.series-title').height()
        })
        $closeBtn.click(closeDetailView)

        $selectedWork.click(event => {
            openDetailView()
            event.preventDefault()
        })

        function openDetailView() {
            // alert('open detail view')
            $('.close-btn').css('display', 'none')
            $('.selected-work').addClass('huge')
            $('.series-title').css('height', titleHeight + 'px')
            $('.series-title').find('h3').css({
                top: 'unset',
                bottom: '0px',
            })
            $('.works-detail').find('.grid-item').addClass('hidden')
            $series.find('.series-title').css('height', '60px')
            $seriesTitle.css('top', 0)
            $seriesTitle.css('bottom', 'unset')
            $selectedWork.removeClass('huge')
            $worksDetail.find('.grid-item').removeClass('hidden')
            $selectedWork.find('.close-btn').css('display', 'unset')
            pack()
            setTimeout(function() {
                let $scrollpane = $series
                while(!$scrollpane.hasClass('scrollpane')){
                    $scrollpane = $scrollpane.parent()
                }
                let index = $('.series').index($series.get(0))
                let top = (22 + titleHeight) * index
                
                $scrollpane.animate({
                    'scrollTop' : top
                }, 500)
            }, 500)
        }
        function closeDetailView(event) {
            // alert('close detail view')
            $selectedWork.addClass('huge')
            $worksDetail.find('.grid-item').addClass('hidden')
            $seriesTitle.css('top', 'unset')
            $seriesTitle.css('bottom', 0)
            $series.find('.series-title').css('height', titleHeight + 'px')
            $('.close-btn').css('display', 'none')
            pack()
            event.preventDefault()
            event.stopPropagation()
        }
    })
})