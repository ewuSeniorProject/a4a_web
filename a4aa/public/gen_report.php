<?php
//    include_once('../public/user.cfg.php');
    use Dompdf\Dompdf;
    use Dompdf\Options;

    $inputJSON = file_get_contents('php://input');
    $input = json_decode($inputJSON, TRUE); //convert JSON into array
    $html = $input["html"];

    $options = new Options();
    $options->set('isHtml5ParserEnabled', true);
    $dompdf = new Dompdf($options);
    $dompdf->setPaper('letter', 'portrait');

    // instantiate and use the dompdf class
    $dompdf->loadHtml($html);

    // Render the HTML as PDF
    $dompdf->render();

    // Output the generated PDF to Browser
    echo $dompdf->output();

