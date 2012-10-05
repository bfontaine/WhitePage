$(function() {

    var lang = {
            save: 'Save',
            saved: 'Saved :)',
            saving_error : 'Oops! an error occurred while saving :(',

            edit: 'Edit',

            retrieve_error: 'Oops! an error occurred while retrieving your content :('
        },
    
        article    = document.getElementById('whitepage'),
        edited     = false,
        last_value = '',

        edit_b     = document.createElement('button');

    function retrieve() {
        $.ajax('api.php?retrieve=1', {
            dataType: 'json',
            success: function(r) {
                if (r.error) {
                    notif(lang.retriving_error, 'error');
                }

                r = r.data;

                article.innerHTML = last_value = r ? r : '';
            },

            error: notif.bind(null, lang.retrieving_error, 'error')
        });
    }

    function save() {
        $.ajax('api.php?save=1', {
            dataType: 'json',
            type: 'POST',
            data: {
                text: article.innerHTML
            },
            
            success: function(r) {
                console.log(r);
            },

            error: notif.bind(null, lang.saving_error, 'error')

        });
    }

    function save_and_exit() {
        save();
        article.removeAttribute('contenteditable');
        edited = false;

        edit_b.innerText = lang.edit;
        edit_b.onclick   = edit;
    }

    function edit() {
        if (edited) {return;}
        edited = true;
        article.setAttribute('contenteditable', true);

        edit_b.innerText = lang.save;
        edit_b.onclick = save_and_exit;
    }

    function notif(text, type) {
        //TODO
        console.log(text, type);
    }

    retrieve();
    edit_b.innerText = lang.edit;
    document.body.insertBefore(edit_b, article);
    edit_b.onclick = edit;
});
