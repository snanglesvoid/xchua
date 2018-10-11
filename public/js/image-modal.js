$(() => {

    let $selection
    let $imageModal = $('#image-modal')
    let $description = $imageModal.find('.caption')
    let $active
    let $imgContainer = $imageModal.find('image-container')
    let $img = $imageModal.find('img')

    $imageModal.click(closeModal)

    $('.modal-image').click(function() {
        $active = $(this)
        let $parent = $active
        let i = 0
        while(!$parent.hasClass('modal-images')) {
            $parent = $parent.parent()
            i++
            if (i > 100) {
                throw 'oops something went wrong'
            } 
        }
        $selection = $parent.find('.modal-image')
        if ($selection.find('[caption]').length == 0) {
            $description.css('height', 0)
            $imgContainer.css('height', '100%')
        }
        else {
            $description.css('height', '150px')
            $imgContainer.css('height', 'calc(100% - 150px)')
        }
        openModal()
        console.log($selection)
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
            $description.html($active.attr('caption'))
            $img.attr('src', $active.attr('src'))
            $imageModal.fadeIn(1000)
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
        $description.fadeOut(500, () => {
            $description.html($next.attr('caption'))
            $description.fadeIn(500)
        })
        $active = $next
    }   
})