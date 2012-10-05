$(function() {

    var lang = {
            save: 'Save',
            saved: 'Saved :)',
            saving_error : 'Oops! an error occurred while saving :(',

            edit: 'Edit',

            retrieve_error: 'Oops! an error occurred while retrieving your content :('
        },

        body       = document.body,
    
        article    = document.getElementById('whitepage'),
        edited     = false,
        last_value = '',

        edit_b     = document.createElement('button'),

        notif      = document.createElement('div'),
        notif_msg  = document.createElement('span'),
        shown_notif= false;


    function retrieve() {
        $.ajax('api.php?retrieve=1', {
            dataType: 'json',
            success: function(r) {
                if (r.error) {
                    display_notif(lang.retriving_error, 'error');
                }

                r = r.data;

                article.innerHTML = last_value = r ? r : '';
            },

            error: display_notif.bind(null, lang.retrieving_error, 'error')
        });
    }

    function save(fn) {
        if (last_value === article.innerHTML) {return;}

        $.ajax('api.php?save=1', {
            dataType: 'json',
            type: 'POST',
            data: {
                text: article.innerHTML
            },
            
            success: function(r) {
                if (r.error) {
                    display_notif(lang.saving_error, 'error');
                }
                else {
                    last_value = r.data;
                    display_notif(lang.saved, 'success');
                }
                if (fn instanceof Function)
                    fn();
            },

            error: display_notif.bind(null, lang.saving_error, 'error')

        });
    }

    function save_and_exit() {
        save();
        article.removeAttribute('contenteditable');
        edited = false;

        edit_b.textContent = lang.edit;
        edit_b.onclick   = edit;
    }

    function regular_saving() {
        if (last_value == article.innerHTML) {return}

        save(function() {
            window.setTimeout(regular_saving, 10000);
        });
    }

    function edit() {
        if (edited) {return;}
        edited = true;
        article.setAttribute('contenteditable', true);
        article.focus();

        edit_b.textContent = lang.save;
        edit_b.onclick = save_and_exit;

        window.setTimeout(regular_saving, 10000);
    }

    function hide_notif(fn) {
        if (!shown_notif) {return}
        $(notif).animate({top: '-500px'}, {
            duration: 2000,
            complete: function(){
                notif_msg.textContent = '';
                shown_notif = false;
                if (fn instanceof Function)
                    fn()
            }
        });
    }

    function display_notif(text, type) {

        if (shown_notif) {
            if (text === notif_msg.textContent) {return}
            return hide_notif(display_notif.bind(null, text, type));
        }

        notif_msg.textContent = text;
        notif.className = 'notif '+type;

        if (!notif_msg.parentNode) {
            notif.appendChild(notif_msg);
        }
        if (!notif.parentNode) {
            body.insertBefore(notif, body.firstChild);
        }

        $(notif).animate({top: '-5px'}, {
            duration: 500,
            complete: function() { shown_notif = true; }
        });

        window.setTimeout(hide_notif, type==='error' ? 3000 : 2000);

    }

    retrieve();
    edit_b.textContent = lang.edit;
    document.body.insertBefore(edit_b, article);
    edit_b.onclick = edit;



});
