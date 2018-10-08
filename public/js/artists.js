function artistLinkMouseover(event) {
    let artist = $(event).attr('artist')
    $(`.preview[artist!="${artist}"`).animate({opacity: 0}, 500)
    $(`.preview[artist="${artist}"]`).animate({opacity: 1}, 500)
}
function artistLinkMouseout(event){
}