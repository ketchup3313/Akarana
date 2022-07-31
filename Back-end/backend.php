<?php

$serverApi = new ServerApi(ServerApi::V1);
$client = new MongoDB\Client(
    'mongodb+srv://Congzhen:aChillea123@akarana.rj2wfvv.mongodb.net/?retryWrites=true&w=majority', [], ['serverApi' => $serverApi]);
$db = $client->test;



?>