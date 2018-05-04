<?php

// Import the Postmark Client Class:
require_once('../vendor/autoload.php');
use Postmark\PostmarkClient;
use Postmark\Models\PostmarkException;

try {
    $to = 'brian.r.mize@gmail.com, brian.r.mize@hotmail.com';
    $subject = "New user added.";
    $from = "noreply@mizesolutions.com";

    $client = new PostmarkClient("3bf0b6f0-90d5-45da-a492-32190de022dc");

    $body = '<p>A new user account has been created. </p>';
    $body .= '<p>Please log in and inactive the user account if you do not recognize the new user.</p>';

    // Send an email:
    $sendResult = $client->sendEmail($from, $to, $subject, $body);

    header("Refresh:2; url=home.php", true, 303);

} catch(PostmarkException $ex){
    // If client is able to communicate with the API in a timely fashion,
    // but the message data is invalid, or there's a server error,
    // a PostmarkException can be thrown.
    echo $ex->httpStatusCode;
    echo $ex->message;
    echo $ex->postmarkApiErrorCode;

} catch(Exception $generalException){
    echo $generalException;
}