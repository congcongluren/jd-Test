!function($){
  //获取目标对象
  let $sf = $('.sf');
  let $bf = $('.bf');
  let $spic = $('.spic');
  let $bpic = $('.bpic');
  let $mainPic = $('.main-pic');
  let $bili = 2.5;
  // ----------------------------
  // 加载对应的图片
  $.ajax({
    url: 'http://localhost/jd-test/object/php/gitsid.php',
    data: {
      sid: 1
    },
    dataType: 'json'
  }).done(function(res){
    let $spicarr = res.spicurl.split(',');
    let $bpicarr = res.bpicurl.split(',');
    let $strhtml = '';

    $spic.attr('src', res.url)
    $bpic.attr('src', res.url);

    $.each($spicarr, function(index, value){
      $strhtml  += `
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
    width : $bf.width() / $bili,
    height : $bf.height() / $bili
  })
  $bpic.css({
    width : $spic.width() * $bili,
    height : $spic.height() * $bili
  })
  // 鼠标移入事件
  $mainPic.hover(function(){
    $sf.css('visibility', 'visible');
    $bf.css('visibility', 'visible');
    $(this).on('mousemove', function(ev){
      
      let $sfleft = ev.pageX - $mainPic.offset().left - $sf.width() / 2;
      let $sftop = ev.pageY - $mainPic.offset().top - $sf.height() / 2;
      
      //判断左右
      if($sfleft < 0){
        $sfleft = 0
      }else if($sfleft > $mainPic.width() - $sf.width()){
        $sfleft = $mainPic.width() - $sf.width();
      }
      //判断上下
      if($sftop < 0){
        $sftop = 0
      }else if($sftop > $mainPic.height() - $sf.height()){
        $sftop = $mainPic.height() - $sf.height();
      }
      //设置小放大镜
      $sf.css({
        left : $sfleft,
        top : $sftop
      })
      //设置大图
      $bpic.css({
        left : -$sfleft * $bili,
        top : -$sftop * $bili
      })
    })
  },function(){
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
  $piclist.on('mouseover','li',function(){
    let $simgurl = $(this).find('img').attr('src');
    let $bimgurl = $(this).find('img').attr('bpicurl');
    $spic.attr('src', $simgurl);
    $bpic.attr('src', $bimgurl);
    $(this).css('border-color', 'red').siblings('li').css('border-color', '#ffffff')
  });
  //点击切换
  $pLeft.on('click', function(){
    $num--;
    let $allLen = $piclist.find('li').length;

    if($num >= 5){
      let $spit = ($num - 5) * $piclist.find('li').outerWidth(true);
      $piclist.css('left', $spit)
    }else{
      $num = 5;
    }
  })

  $pRight.on('click', function(){
    $num++;
    let $allLen = $piclist.find('li').length;
    
    if($num <= $allLen){
      let $spit = ($num - 5) * $piclist.find('li').outerWidth(true);
      $piclist.css('left', -$spit)
      console.log($spit);
    }else{
      $num = $allLen;
    }
  })
  
}(jQuery)
