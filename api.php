<?php

function response($data=null, $err=null) {
    $resp = array(
        'data' => $data
    );

    if ($err)
        $resp['error'] = $err;

    header('Content-Type: application/json; charset=utf-8');
    
    echo json_encode($resp);
}

function save($filename) {
    if (!isset($_POST['text']))
        return response();

    $text = trim($_POST['text']);

    if (!file_put_contents($filename, $text))
        return response(null, 'Writing error.');

    return response($text);
}

function retrieve($filename) {
    $text = file_get_contents($filename);

    return response($text);
}

function call($filename) {
    if (isset($_POST['save']) && $_POST['save'])
        return save($filename);

    if (isset($_GET['retrieve']) && $_GET['retrieve'])
        return retrieve($filename);

    return response(null, 'unrecognized action.');
}

call('save.txt');

?>
