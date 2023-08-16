<?php
// phpmailer files
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';
require 'config.php';

// Email formatting
$body = "";
$title = 'Email subject';
$c = true;

foreach ($_POST as $key => $value) {
  if ($value != "") {
    $body .= "
    " . (($c = !$c) ? '<tr>' : '<tr style="background-color: #f8f8f8;">') . "
      <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
      <td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
    </tr>
    ";
  }
}

$body = "<table style='width: 100%;'>$body</table>";

// PHPMailer settings
$mail = new PHPMailer(true);

try {
  $mail->isSMTP();
  $mail->CharSet = "UTF-8";
  $mail->SMTPAuth   = true;

  // Email settings
  $mail->Host       = SMTP_HOST;
  $mail->Username   = SMTP_USERNAME;
  $mail->Password   = SMTP_PASSWORD;
  $mail->SMTPSecure = 'ssl';
  $mail->Port       = 465;

  $mail->setFrom('sergejs.ivcenko@gmail.com', 'Message form Coffee Chino website');
  $mail->addAddress('sergejs.ivcenko@gmail.com');

  $mail->isHTML(true);
  $mail->Subject = $title;
  $mail->Body = $body;

  $mail->send();
  echo 'Email has been sent';
} catch (Exception $e) {
  $status = "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
  echo "{$status}";
}
