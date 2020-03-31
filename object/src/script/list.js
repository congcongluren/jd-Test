! function ($) {
  let $goodslist = $('.goods ul');
  // 初始化渲染
  $.ajax({
    url: 'http://localhost/jd-Test/object/php/getgoods.php',
    data: {

    },
    dataType: 'json'
  }).done(function (res) {
    $.each(res,function(index,value){
      let $clonebox = $('.g-item:hidden').clone(true,true);
      $clonebox.attr('sid',res[index].sid)
      $clonebox.css('display','block')
      $clonebox.find('.gl-img img').attr('src', value.url);
      $clonebox.find('.gl-price i').html(value.price);
      $clonebox.find('.gl-title a').html(value.title);
      $('.goods ul').append($clonebox);
    });  
  });
  
  $goodslist.on('click', '.gl-img, .gl-title',function(){
    let $sid = $(this).parents('li').attr('sid');
    $(this).parents('li').find('a').attr('href','./detail.html?sid='+$sid)
  })

}(jQuery);