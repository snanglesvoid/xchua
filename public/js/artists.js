function artistLinkMouseover(event) {
    let artist = $(event).attr('artist')
    $(event).siblings().removeClass('active')
    $(event).addClass('active')
    $(`.preview`).css('opacity', 0)
    $(`.preview[artist="${artist}"]`).css('opacity', 1)
}
function artistLinkMouseout(event){

}


let $scrollpane

function scrollToSection(event) {
    let $a = $(event)
    let select = $a.attr('select')
    let $section = $(select)

    let top = $section.position().top 
    if (top > 20) top += 10
    $scrollpane.animate({
        'scrollTop' : top
    }, 500)


    $a.parent().siblings().removeClass('active')
    $a.parent().addClass('active')

    artistLinkMouseover($section.next())
}

$(function() {
    $scrollpane = $('#artists-sp')

    let $rlink = $('a[select="#resident"]').parent()
    let $glink = $('a[select="#guest"]').parent()
    let $rtitle = $('#resident')
    let $gtitle = $('#guest')
    $scrollpane.on('ps-scroll-y', function(event) {
        let top = $scrollpane.scrollTop()
        // console.log(top, $gtitle.position().top)
        
        if (top > $gtitle.position().top - 200) {
            $glink.addClass('active')
            $rlink.removeClass('active')
        }
        else {
            $rlink.addClass('active')
            $glink.removeClass('active')
        }
    })
})