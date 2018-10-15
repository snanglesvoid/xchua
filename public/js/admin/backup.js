function downloadBackup() {
    let exportName = 'XCHua_Website_Backup_' + (new Date().toDateString())
    downloadObjectAsJson(dbState, exportName)
}
function downloadObjectAsJson(exportObj, exportName){
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}
let dbState
$(function() {
    $('#cnt').hide()
    $.get('/admin/backup-json', data => {
        dbState = data
        $('#cnt').show()
        $('#spinner').hide()
    })
    $('.submit-btn').hide()
    $('.cancel-btn').hide()
    $('.inputfile').each(function() {
        let $input = $(this)
        let $label = $(this.nextElementSibling)
        let labelVal = $label.html()

        $label.click( e => $input.click() )
        $input.change( e => {
            var fileName = '';
            fileName = e.target.value.split( '\\' ).pop();
            console.log('change', fileName)
            if( fileName ) {
                $('.submit-btn').html('Restore from backup: ' + fileName)
                $('.submit-btn').show()
                $('.cancel-btn').show()
                $label.hide()
            }
        })
    })
        
    $('.cancel-btn').click(function() {
        window.location = '/admin/backup'
    })
})
