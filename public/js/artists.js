function artistLinkMouseover(event) {
    let artist = $(event).attr('artist')
    $(`.preview`).css('opacity', 0)
    $(`.preview[artist="${artist}"]`).css('opacity', 1)
}
function artistLinkMouseout(event){
}