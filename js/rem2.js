//(function (doc, win) {
//  var docEl = doc.documentElement,
//      resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
//      recalc = function () {
//      var clientWidth = docEl.clientWidth;
//      if (!clientWidth) return;
//      // if(clientWidth>=750){
//      //     docEl.style.fontSize = '100px';
//      // }else{
//          docEl.style.fontSize =16* (clientWidth /750) + 'px';
//      // }
//      };
//  if (!doc.addEventListener) return;
//  win.addEventListener(resizeEvt, recalc, false);
//  doc.addEventListener('DOMContentLoaded', recalc, false);
//})(document, window);


//微信去掉下方刷新栏
if(navigator.userAgent.indexOf('MicroMessenger') >= 0){
  document.addEventListener('WeixinJSBridgeReady', function() {
    //WeixinJSBridge.call('hideToolbar');
  });
}

//获取地址栏参数
function GetURL(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if(r != null) return unescape(r[2]);
  return null;
}

//移动端弹框
function danger(str,time){
  var node = document.createElement("div");
  node.setAttribute("id","danger")
  node.innerHTML = str;
  node.style.cssText = "position: fixed;padding: 0.625rem 2.5rem;bottom: 20%;left: 50%;font-size: 1.75rem;-webkit-transform: translate(-50%, -50%);transform: translate(-50%, -50%);color: #fff;background: rgba(0,0,0,.6);border-radius: 0.625rem;white-space: nowrap;z-index:999;"
  document.body.appendChild(node);
  setTimeout(function(){
    document.getElementById("danger").remove();
  },time)
  // if(str=="请先登陆"||str=="请先登录"){
  //   setTimeout(function(){
  //     location.href='login';
  //   },time)
  // }
}

//AJAX地址
//var myPath = 'http://www.zxcoupon.com/';
// var myPath = "http://coupon.net:8080/";

//接口签名sign
function getsign(){
  var time = new Date().getTime();
  var obj = {};
  var sign = "83847437837439234394834"+time;
  obj.sign=sign;
  obj.time = time;
  return obj;
}

//非空验证
function rule(str){
  if(str.replace(/\s/,"").length!=0){return true;}else{return false;}
}


//xss攻击屏蔽
function stripscript(s){ 
  //var pattern = new RegExp("[%--`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")        //格式 RegExp("[在中间定义特殊过滤字符]")
  var pattern = new RegExp("[%--`~!@#$^&*()=|{}':;',\\[\\]<>/?~！@#￥……&*|{}']");
  var rs = ""; 
  for (var i = 0; i < s.length; i++) { 
    rs = rs+s.substr(i, 1).replace(pattern, ''); 
  }
  return rs;
}

//back按钮
var $back = document.getElementsByTagName("i")[0];

if($back != undefined){
  $back.addEventListener("click",function(){
    window.history.back();
  }) 
}