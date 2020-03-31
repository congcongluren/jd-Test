!function($){
// --------------------------------
  // 设置商品cookie变量
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

}(jQuery)
