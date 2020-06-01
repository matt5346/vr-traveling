<?php
  $email;$comment;$captcha;
  $email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
  $comment = filter_input(INPUT_POST, 'comment', FILTER_SANITIZE_STRING);
  $captcha = filter_input(INPUT_POST, 'token', FILTER_SANITIZE_STRING);
  if(!$captcha){
    echo '<h2>Please check the the captcha form.</h2>';
    exit;
  }
  $secretKey = "6LeNifQUAAAAAIsjtXYdv9i2fIApqlBhmsbrmSt6";
  $ip = $_SERVER['REMOTE_ADDR'];

  // post request to server
  $url = 'https://www.google.com/recaptcha/api/siteverify';
  $data = array('secret' => $secretKey, 'response' => $captcha);

  $options = array(
    'http' => array(
      'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
      'method'  => 'POST',
      'content' => http_build_query($data)
    )
  );
  $context  = stream_context_create($options);
  $response = file_get_contents($url, false, $context);
  $responseKeys = json_decode($response,true);
  header('Content-type: application/json');
  if($responseKeys["success"]) {
    echo json_encode(array('success' => 'true'));
    
    // Данные от пользователя
    $fields = array('fSubject', 'fName', 'fPhone');

    foreach ($fields as $key) {
      $$key = isset($_POST[$key]) ? trim($_POST[$key]) : '';
    }

    $message = array();

    if ($fName !== '') {
        $message[] = "<b>Имя:</b> ".$fName;
    }

    if ($fPhone !== '') {
        $message[] = "<b>Номер телефона:</b> ".$fPhone;
    }

    if ($fSubject !== '') {
        $message[] = "<b>Тема ролика:</b> ".$fTheme;
    }

    $message = implode("<br>\r\n", $message);

    $to = 'matvey20.18@bk.ru';
    $subject = 'Новая заявка с сайта vr-traveling.com'; 
    $headers = "From: vr-traveling.com \r\n" .
          "Content-type: text/html; charset=UTF-8 \r\n";
      mail($to, $subject, $message, $headers);
    exit;
  } else {
    echo json_encode(array('success' => 'false'));
  }
?>
