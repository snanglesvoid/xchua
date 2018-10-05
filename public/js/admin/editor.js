const config = {
}

$(function() {

    $('[data-editable]').each(function() {
        let $div = $(this)

        let attrData = JSON.parse($div.attr('data-editable'))
        let list = attrData.list
        let path = attrData.path
        let data = JSON.parse(attrData.data)
        console.log(data)

        let $button = $('<a class="ks-editable-btn">EDIT TEXT</a>')
        $button.css({
            'position': 'absolute',
            'top' : 0,
            'right' : 0,
            'background': 'white',
            'z-index': 3
        })

        $button.click(function() {
            InlineEditor
            .create($div.get(0), config)
            .catch(error => {
                console.error(error)
            })
            
            $button.html('SAVE')
            $button.off('click')
            $button.click(function() {

                let formData = {}
                formData[path] = $div.html()
                formData._id = data._id

                $.post(
                    `/keystone/api/${list}/${data._id}`,
                    formData,
                    data => {
                        alert('your changes have been saved')
                        location.reload()
                    },
                )
            })
        })
        
        $div.after($button)
    })
})