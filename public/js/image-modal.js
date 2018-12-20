
$(() => {

    let $selection
    let $imageModal = $('#image-modal')
    let $description = $imageModal.find('.description')
    let $caption= $imageModal.find('.caption')
    let $active
    let $imgContainer = $imageModal.find('image-container')
    let $img = $imageModal.find('img')

    $imageModal.click(closeModal)

    $('.modal-image').click(function() {
        $active = $(this)
        let $parent = $active
        let i = 0
        try {
            while(!$parent.hasClass('modal-images')) {
                $parent = $parent.parent()
                if ($parent.hasClass('selected-work')) {
                    throw 'oops'
                }
                i++
                if (i > 100) {
                    throw 'oops something went wrong'
                } 
            }
        } catch (error) {
            return
        }

        $selection = $parent.find('.modal-image')
        if ($selection.find('[caption]').length == 0) {
            // $description.css('height', 0)
            // $imgContainer.css('height', '100%')
        }
        else {
            $description.css('height', '150px')
            $imgContainer.css('height', 'calc(100% - 150px)')
        }
        openModal()
        // console.log($selection)
    })

    $('.previous-image-button').click(function(evt) {
        plusImage(-1)
        evt.stopPropagation()
    })
    $('.next-image-button').click(function(evt) {
        plusImage(1)
        evt.stopPropagation()
    })

    function openModal() {
        if ($selection) {
            $caption.html($active.attr('caption'))
            $img.attr('src', $active.attr('src'))
            $imageModal.fadeIn(1000)
            setTimeout(fitCaption,10)
        }
    }

    function closeModal() {
        $imageModal.fadeOut(1000)
        $selection = null
        $active = null
    }
    
    function plusImage(n) {
        let elm = $active.get(0)
        let i = $selection.index(elm)
        i += n
        i = i < 0 ? $selection.length + i : i % $selection.length
        console.log(i)
        let $next = $($selection.get(i))
        $img.fadeOut(500, () => {
            $img.attr('src', $next.attr('src'))
            $img.fadeIn(500)
        })
        $caption.fadeOut(500, () => {
            $caption.html($next.attr('caption'))
            $caption.fadeIn(500)
            setTimeout(fitCaption, 10)
        })
        $active = $next
    }

    function fitCaption() {
        let right = ($caption.width() - $('.img-container img').width())/2
        right = right < 0 ? 0 : right
        console.log('fit', right)
        $caption.find('p').css('margin-right', right) 
    }

    $(window).resize(fitCaption)
})