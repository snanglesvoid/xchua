function artistLinkMouseover(event) {
    // let src = $(event).attr('thumbnail-src')
    let artist = $(event).attr('artist')
    $('.preview').css('display', 'none')
    $(`.preview[artist="${artist}"]`).css('display', 'block')
    // if (src) {
    //     let $img = $('.picture-container img')
    //     let op = $img.css('opacity')
    //     if (op == 0) {
    //         $img.css('opacity', 1)
    //         $img.attr('src', src)
    //     }
    //     else {
    //         $img.css('opacity', 0)
    //         setTimeout(() => {
    //             $img.css('opacity', 1)
    //             $img.attr('src', src)
    //         }, 10)
    //     } 
    // }
}
function artistLinkMouseout(event){
    let $img = $('.picture-container img')
    $img.css('opacity', 0)
    $img.attr('src')
}