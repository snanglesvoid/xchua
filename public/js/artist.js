function openTab(event) {
    console.log(event)
    let $a = $(event)
    let tabName = $a.html().toLowerCase()
    $a.parent().siblings().removeClass('active')
    $a.parent().addClass('active')

    $('.tab.active').removeClass('active')
    $(`#${tabName}`).addClass('active')
}
