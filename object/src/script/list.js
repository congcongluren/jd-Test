! function ($) {
  $.ajax({
    url: 'http://localhost/jd-Test/object/src/php/getgoods.php',
    data: {

    },
    dataType: 'json'
  }).done(function (res) {
    $.each(res,function(index,value){
      let $clonebox = $('.g-item:hidden').clone(true,true);
      $clonebox.css('display','block')
      $clonebox.find('.gl-img img').attr('src', value.url);
      $clonebox.find('.gl-price i').html(value.price);
      $clonebox.find('.gl-title a').html(value.title);
      $('.goods ul').append($clonebox);
    });
    
  })
}(jQuery);