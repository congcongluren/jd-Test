<?php
include './conn.php';

if (isset($_GET['sid'])) {
  $sid = $_GET['sid'];

  $sql = "select * from jdgoods where sid=$sid";
  $res = $conn->query($sql);

  // for ($i = 0; $i < $res->num_rows; $i++) {
  //   $arr[$i] = $res->fetch_assoc();
  // }

  echo json_encode($res->fetch_assoc());

} else {
  echo 'false';
}
