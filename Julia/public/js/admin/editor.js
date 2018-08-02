$(() => {
    let editor = ContentTools.EditorApp.get()
    editor.init('*[data-editable]', 'data-name')

    console.log('editor initialized', editor)

    editor.addEventListener('saved', function(evt) {
        console.log('editor::saved', evt)

        let name, payload, regions, xhr

        regions = evt.detail().regions
        if (Object.keys(regions).length == 0) {
            return
        }

        this.busy(true)

        function onStateChange(evt2) {
            // Check if the request is finished
            if (evt2.target.readyState == 4) {
                editor.busy(false);
                if (evt2.target.status == '200') {
                    // Save was successful, notify the user with a flash
                    new ContentTools.FlashUI('ok');
                } else {
                    // Save failed, notify the user with a flash
                    new ContentTools.FlashUI('no');
                }
            }
        } 

        xhr = new XMLHttpRequest()
        xhr.addEventListener('readystatechange', onStateChange)
        xhr.open('POST', '/admin/save-page')
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send(JSON.stringify(regions))
    })

    ContentTools.StylePalette.add([

    ])

    ContentTools.IMAGE_UPLOADER = imageUploader
})

function imageUploader(dialog) {

    window.dialog = dialog

    let image, xhr, xhrComplete, xhrProgress

    dialog.addEventListener('imageuploader.cancelupload', function() {
        //stop upload
        if (xhr) {
            xhr.upload.removeEventListener('progress', xhrProgress)
            xhr.removeEventListener('readystatechange', xhrComplete)
            xhr.abort()
        }

        dialog.state('empty')
    })

    dialog.addEventListener('imageuploader.clear', function() {
        dialog.clear()
        image = null

        //TODO delete image from server
    })

    dialog.addEventListener('imageuploader.fileready', function(evt) {
        let file = evt.detail().file
        let formData

        xhrProgress = function(evt2) {
            dialog.progress((evt2.loaded / evt2.total) * 100)
        }

        xhrComplete = function(evt2) {
            let response

            if (evt2.target.readyState != 4) {
                return 
            }

            xhr = null
            xhrProgress = null
            xhrComplete = null

            if (parseInt(evt2.target.status) == 200) {
                response = JSON.parse(evt2.target.responseText)

                 console.log('response: ', response)

                image = {
                    size: response.size,
                    url: response.url,
                }

                dialog.populate(image.url, image.size)
            } else {
                new ContentTools.FlashUI('no')
            }
        }

        dialog.state('uploading')
        dialog.progress(0)

        formData = new FormData()
        formData.append('image', file)

        xhr = new XMLHttpRequest()
        xhr.upload.addEventListener('progress', xhrProgress)
        xhr.addEventListener('readystatechange', xhrComplete)
        xhr.open('POST', '/admin/upload-image', true)
        xhr.send(formData)
    })


    function rotateImage(direction) {
        // Request a rotated version of the image from the server
        var formData;

        // Define a function to handle the request completion
        xhrComplete = function (ev) {
            var response;

            // Check the request is complete
            if (ev.target.readyState != 4) {
                return;
            }

            // Clear the request
            xhr = null
            xhrComplete = null

            // Free the dialog from its busy state
            dialog.busy(false);

            // Handle the result of the rotation
            if (parseInt(ev.target.status) == 200) {
                // Unpack the response (from JSON)
                response = JSON.parse(ev.target.responseText);

                // Store the image details (use fake param to force refresh)
                image = {
                    size: response.size,
                    url: response.url + '?_ignore=' + Date.now()
                };

                // Populate the dialog
                dialog.populate(image.url, image.size);

            } else {
                // The request failed, notify the user
                new ContentTools.FlashUI('no');
            }
        }

        // Set the dialog to busy while the rotate is performed
        dialog.busy(true);

        // Build the form data to post to the server
        formData = new FormData();
        formData.append('url', image.url);
        formData.append('direction', direction);

        // Make the request
        xhr = new XMLHttpRequest();
        xhr.addEventListener('readystatechange', xhrComplete);
        xhr.open('POST', '/rotate-image', true);
        xhr.send(formData);
    }

    dialog.addEventListener('imageuploader.rotateccw', function () {
        rotateImage('CCW')
    })

    dialog.addEventListener('imageuploader.rotatecw', function () {
        rotateImage('CW')
    })

    dialog.addEventListener('imageuploader.save', function() {
        let crop, cropRegion, formData

        xhrComplete = function(evt) {
            if (evt.target.readyState !== 4) {
                return;
            }

            xhr = null
            xhrComplete = null

            dialog.busy(false)

            if (parseInt(evt.target.status) == 200) {
                let response = JSON.parse(evt.target.responseText)

                dialog.save(
                    response.url,
                    response.size,
                    {
                        'alt' : response.alt,
                        'data-ce-max-width' : response.size[0]
                    }
                )
            }
            else {
                new ContentTools.FlashUI('no')
            }
        }

        dialog.busy(true)

        formData = new FormData()
        formData.append('url', image.url)

        // Set the width of the image when it's inserted, this is a default
        // the user will be able to resize the image afterwards.
        formData.append('width', 600)

        if (dialog.cropRegion()) {
            formData.append('crop', dialog.cropRegion())
        }

        xhr = new XMLHttpRequest()
        xhr.addEventListener('readystatechange', xhrComplete)
        xhr.open('POST', '/admin/insert-image', true)
        xhr.send(formData)
    })

}