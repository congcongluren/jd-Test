! function ($) {
  //获取目标对象
  let $sf = $('.sf');
  let $bf = $('.bf');
  let $spic = $('.spic');
  let $bpic = $('.bpic');
  let $mainPic = $('.main-pic');
  let $bili = 2.5;
  // 获取标题和图片
  let $title = $('.p-title span');
  let $price = $('.g-price strong');
  // ----------------------------
  // 获取sid
  let $sid = window.location.search.substring(1).split('=')[1];
  if (!$sid) {
    $sid = 1;
  }

  // 加载对应的图片
  $.ajax({
    url: 'http://localhost/jd-test/object/php/gitsid.php',
    data: {
      sid: $sid
    },
    dataType: 'json'
  }).done(function (res) {
    let $spicarr = res.spicurl.split(',');
    let $bpicarr = res.bpicurl.split(',');
    let $strhtml = '';
    // 设置价格及商品名
    $title.html(res.title);
    $price.html(res.price);
    // 设置图片
    $spic.attr('src', res.url)
    $bpic.attr('src', res.url);

    $.each($spicarr, function (index, value) {
      $strhtml += `
        <li>
          <img src = '${value}' bpicurl = '${$bpicarr[index]}'/>
        </li>
      `;
    });

    $('.piclist').html($strhtml)
    
  })
  
  // ------------------------------
  //放大镜效果
  // 设置小放大镜大图默认大小
  $sf.css({
    width: $bf.width() / $bili,
    height: $bf.height() / $bili
  })
  $bpic.css({
    width: $spic.width() * $bili,
    height: $spic.height() * $bili
  })
  // 鼠标移入事件
  $mainPic.hover(function () {
    $sf.css('visibility', 'visible');
    $bf.css('visibility', 'visible');
    $(this).on('mousemove', function (ev) {

      let $sfleft = ev.pageX - $mainPic.offset().left - $sf.width() / 2;
      let $sftop = ev.pageY - $mainPic.offset().top - $sf.height() / 2;

      //判断左右
      if ($sfleft < 0) {
        $sfleft = 0
      } else if ($sfleft > $mainPic.width() - $sf.width()) {
        $sfleft = $mainPic.width() - $sf.width();
      }
      //判断上下
      if ($sftop < 0) {
        $sftop = 0
      } else if ($sftop > $mainPic.height() - $sf.height()) {
        $sftop = $mainPic.height() - $sf.height();
      }
      //设置小放大镜
      $sf.css({
        left: $sfleft,
        top: $sftop
      })
      //设置大图
      $bpic.css({
        left: -$sfleft * $bili,
        top: -$sftop * $bili
      })
    })
  }, function () {
    $sf.css('visibility', 'hidden');
    $bf.css('visibility', 'hidden');
  })
  // ---------------------------
  //加载小图切换
  let $piclist = $('.piclist');
  let $pLeft = $('.p-left');
  let $pRight = $('.p-right');
  let $num = 5;
  //鼠标移入切换
  $piclist.on('mouseover', 'li', function () {
    let $simgurl = $(this).find('img').attr('src');
    let $bimgurl = $(this).find('img').attr('bpicurl');
    $spic.attr('src', $simgurl);
    $bpic.attr('src', $bimgurl);
    $(this).css('border-color', 'red').siblings('li').css('border-color', '#ffffff')
  });
  //点击切换
  $pLeft.on('mousedown', function () {
    $num--;
    if ($num >= 5) {
      $(this).css('opacity', 0.8)
      let $spit = ($num - 5) * $piclist.find('li').outerWidth(true);
      $piclist.css('left', -$spit)
    } else {
      $num = 5;
    }
  })
  $pLeft.on('mouseup', function () {
    let $allLen = $piclist.find('li').length;
    if ($num < $allLen) {
      $pRight.css('opacity', 0.5);
    }

    if ($num > 5) {
      $(this).css('opacity', 0.5);
    } else {
      $(this).css('opacity', 0.3);
    }

  })

  $pRight.on('mousedown', function () {
    $num++;
    let $allLen = $piclist.find('li').length;
    $(this).css('opacity', 0.8);

    if ($num <= $allLen) {
      $pLeft.css('opacity', 0.5);

      let $spit = ($num - 5) * $piclist.find('li').outerWidth(true);
      $piclist.css('left', -$spit)
    } else {
      $num = $allLen;
    }
  })
  $pRight.on('mouseup', function () {
    let $allLen = $piclist.find('li').length;
    if ($num == $allLen) {
      $(this).css('opacity', 0.3);
    } else {
      $(this).css('opacity', 0.5);
    }
  })

// --------------------------------
  // 设置商品变量
  let $arrsid = [];
  let $arrnum = [];
  
  function cookietoarray(){
    // 获取或者重置购物车数据
    if(jscookie.get('cookiesid') && jscookie.get('cookienum')){
      $arrsid = jscookie.get('cookiesid').split(',');
      $arrnum = jscookie.get('cookienum').split(',');
      $arrnum = $arrnum.map((value)=>{
        return parseInt(value)
      })
    }else{
      jscookie.del('cookiesid');
      jscookie.del('cookienum');
      $arrsid = [];
      $arrnum = [];
    }
    // // 设置商品数量
    // if($.inArray($sid, $arrsid) >= 0 && numinput){
    //   if($numinput){
    //     $numinput.val(+$arrnum[$.inArray($sid, $arrsid)]);
    //   }else{
    //     let $numinput = $(numinput);
    //     $numinput.val(+$arrnum[$.inArray($sid, $arrsid)]);
    //   }
    // }
  }
  // 数组转成coolie
  function arraytocookie(){
    // 设置购物车数据
    jscookie.add('cookiesid', $arrsid, 10);
    jscookie.add('cookienum', $arrnum, 10);
  }
// ---------------------------------------------
  
  // 数量加减
  let $numinput = $('#g-numinput');
  let $numadd = $('.add');
  let $numcut = $('.cut');
  let $addcart = $('.addcart');

  cookietoarray();
  // console.log($arrsid ,$arrnum);
  
  $numadd.on('click',function(){
    let $num = $numinput.val();
    $num++;
    $numinput.val($num);
  })

  $numcut.on('click',function(){
    let $num = $numinput.val();
    if(--$num < 1){
      $num = 1
    };
    $numinput.val($num);
  })

  $addcart.on('click',function(){
    if($.inArray($sid, $arrsid) >= 0){
      $arrnum[$.inArray($sid, $arrsid)] += (+$numinput.val());
    }else{
      $arrsid.push($sid);
      $arrnum[$.inArray($sid, $arrsid)] = $numinput.val();
    }
    
    arraytocookie();
    alert('成功加入购物车！')
  })
}(jQuery);
