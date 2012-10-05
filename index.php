<?php
### Configuration
    $lang    = 'en';
    $charset = 'utf-8';
    $title   = 'White Page';
###
?>
<!doctype html>
<html lang="<?php echo $lang; ?>" dir="ltr">
        <head>
            <meta charset="<?php echo $charset ?>" />
            <meta name="language" content="<?php echo $lang; ?>" />
            <title><?php echo $title; ?></title>

            <meta name="robots" content="noindex,nofollow" />
            <link rel="stylesheet" href="whitepage.min.css" media="all" />

        </head>
        <body>
            <article id="whitepage"></article>
            <script src="jquery-1.8.2.min.js"></script>
            <script src="whitepage.min.js"></script>
        </body>
</html>

