const config = {
}

$(function() {
    $('[snippet-editable]').each(function() {
        let $div = $(this)

        $div.css('position', 'relative')

        let attrData = JSON.parse($div.attr('snippet-editable'))
        let list = attrData.list
        let path = attrData.path
        let data = JSON.parse(attrData.data)

        let $button = $('<a class="ks-editable-btn"><i class="fa-language fa"></i></a>')
        $button.css({
            'position': 'fixed',
            'display' : 'none',
            'background': 'rgba(0,0,0,0.5)',
            'color' : '#fff',
            'border' : '1 px solid white',
            'z-index': 3,
            'padding': '0px',
            'font-size' : '16px',
            'line-height' : '24px',
            'height' : '24px',
            'width' : '24px',
            'border-radius' : '50%',
        })

        $div.mouseover(function() {
            $button.css({
                'display' : 'inline-block',
                'top' : $div.offset().top,
                'left' : $div.offset().left + $div.width() - 6,
            })
        })
        $div.mouseout(function() {
            setTimeout(() => $button.css({'display' : 'none' }), 2000)
        })

        if (typeof data === 'string') {
            console.log('MISSING SNIPPET')
            $div.css('color', 'red')
            $div.html('missing snippet: ' + data)
            $div.click(function(e) {
                e.preventDefault()
                return false
            })
            
            $button.html('<i class="fa fa-plus"></i>')
            
            function click() {
                $.post(
                    '/keystone/api/textsnippets/create',
                    {title: data},
                    response => {
                        let win = window.open('/keystone/textsnippets/' + response.id , '_blank')
                        if (win) {
                            window.focus(win)
                        }
                        else {
                            alert('please allow popups for this site.')
                        }
                    }
                )
                return false
            }
            
            $button.click(click)
        }
        else {
            $button.click(function() {
                let win = window.open('/keystone/textsnippets/' + data._id, '_blank')
            })
        }

        $div.after($button)
    })
    $('[data-editable]').each(function() {
        let $div = $(this)
        
        let attrData = JSON.parse($div.attr('data-editable'))
        let list = attrData.list
        let path = attrData.path
        let data = JSON.parse(attrData.data)

        // console.log(data)

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

// $(function() {
//     $('[data-image-upload]').each(function() {
//         let $div = $(this)
//         $div.addClass('upload-container')

//         let attrData = JSON.parse($div.attr('data-image-upload'))
//         let list = attrData.list
//         let path = attrData.path
//         let data = JSON.parse(attrData.data)
//         console.log(data)

//         let $button = $('<a class="ks-editable-btn">Upload Image</a>')
//         $button.css({
//             'position': 'absolute',
//             'bottom' : 0,
//             'right' : 0,
//             'background': 'white',
//             'z-index': 3
//         })



//         $button.click(function() {
//             $div.after(`
//             <input type="file" name="file" id="file">
            
//             <!-- Drag and Drop container-->
//             <div class="upload-area"  id="uploadfile">
//                 <h1 id="drag-h1">Drag and Drop file here<br/>Or<br/>Click to select file</h1>
//             </div>
//             `)

//             $('html').on('dragover', function(e) {
//                 e.preventDefault()
//                 e.stopPropagation()
//                 $('#drag-h1').text('drag here')
//             })
//             $('html').on('drop', function(e) {
//                 e.preventDefault()
//                 e.stopPropagation()
//             })
//             $('.upload-area').on('dragover', function(e) {
//                 e.stopPropagation()
//                 e.preventDefault()
//                 $('#drag-h1').text('drop')
//             })
//         })

//         $div.after($button)
//     })
// })