<?php
include 'conn.php';

$sql = "select * from jdgoods";

$res = $conn->query($sql);

// if ($res) {
//   echo "记录不为空";
// } else {
//   echo "记录为空";
// }

for ($i = 0; $i < $res->num_rows; $i++){
  $arr[$i] = $res->fetch_assoc();
}

echo json_encode($arr);