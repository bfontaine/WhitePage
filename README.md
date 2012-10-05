WhitePage
=========

Features
--------

* Light : the whole app (server code + client code) is ~125ko (jQuery = 73% of
  the app size)
* All is made with AJAX code, so you never have to reload the page
* Text is auto-saved every 10 seconds if you modify it

Installing
----------

Simply copy all the files in a directory accessible on the Web. You need to
create a file to store the scratch pad’s content, its name is “save.txt” by
default, but you can change it, at the end of `api.php`, replace `'save.txt'`
with the path of the file.

You can then access to `index.php` in your Web browser, and start typing your
thoughts.


i18n
----

Don’t speak English? You can change the page’s language on top of
`whitepage.js` file. You can set each string to what you want :

```js
    var lang = {
            save: '<The button’s value for “Save the scratch pad”>',
            saved: '<The message displayed when the scratch pad has been
            saved>',
            saving_error : '<The message displayed when there has been an error
            while saving>',

            edit: '<The button’s value for “Edit the scratch pad”>',

            retrieve_error: '<The message displayed when there has been an error
            while retrieving the scratch pad’s content>'
        },
    // …
```
