<?php
include './conn.php';

if (isset($_GET['sid'])) {
  $sid = $_GET['sid'];

  $sql = "select * from jdgoods where sid=$sid";
  $res = $conn->query($sql);

  echo json_encode($res->fetch_assoc());

} else {
  echo 'false';
}
