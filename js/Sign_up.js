//设置cooke
function setCookie(name,value,day){
    var date = new Date();
    date.setDate(date.getDate() + day);
    document.cookie = name + '=' + value + ';expires='+ date;
};
//获取cookie
function getCookie(name){
    var reg = RegExp(name+'=([^;]+)');
    var arr = document.cookie.match(reg);
    if(arr){
        return arr[1];
    }else{
        return '';
    }
};
//删除cookie
function delCookie(name){
    setCookie(name,null,-1);
};
//验证码倒计时
var countdown=60;
var _generate_code = $("#yanzheng_btn");
function settime() {
    if (countdown == 0) {
        _generate_code.attr("disabled",false);
        _generate_code.val("获取验证码");
        countdown = 60;
        return false;
    } else {
        $("#yanzheng_btn").attr("disabled", true);
        _generate_code.val("重新发送(" + countdown + ")");
        countdown--;
    }
    setTimeout(function() {
        settime();
    },1000);
}
function alert_msg(msg){
    layer.open({
        content:msg,
        btn: '确定',
        shadeClose: true,
    });
}

//注册验证码
$("#yanzheng_btn").click(function() {
    if($("#tel").val() == '' || $("#tel").val() == undefined){
        layer.open({
            content: '手机号不能为空',
            btn: '确定',
            shadeClose: true,
        });
    }else{
        var myreg = /^1[3456789]\d{9}$/;
        if(!myreg.test($("#tel").val())) {
            layer.open({
                content: '请输入正确的手机号',
                btn: '确定',
                shadeClose: true,
            });
        } else{
            var obj=new Object();
            obj.mobile=$("#tel").val();
            obj.type=1;
            console.log(obj);
            $.ajax({
                url: "http://47.95.216.46/api/user/register",
                async: false,
                type: "post",
                dataType: "json",
                data: obj,
                success: function(data) {
                    console.log(data);
                    settime();
                },
                error: function() {
                }
            });
        }
    }
});

//点击注册
$("#next_up").click(function () {
    //严重是否输入
    if($("#tel").val() == '' || $("#tel").val() == undefined) {
        alert_msg("请输入手机号")
    }else if($("#code").val() == '' || $("#code").val() == undefined){
        alert_msg("请输入验证码")
    }else if($("#pasd").val() == '' || $("#pasd").val() == undefined){
        alert_msg("请输入密码")
    }else{
        var myreg = /^1[3456789]\d{9}$/;
        if(!myreg.test($("#tel").val())) {
            alert_msg("请输入正确手机号")
        } else {
            //验证验证码
            code_Detection();
        }
    }
});
//验证验证码
function code_Detection() {
    var obj=new Object();
    obj.mobile=$("#tel").val();
    obj.type=4;
    obj.code=$("#code").val();
    console.log(obj);
    $.ajax({
        url: "http://47.95.216.46/api/user/checkCode",
        async: false,
        type: "post",
        dataType: "json",
        data: obj,
        success: function(res) {

        },
        error: function() {
            alert(2)
        }
    });
};

//注册
function Loading() {
    var obj=new Object();
    obj.mobile=$("#tel").val();
    obj.password=hex_md5($("#pasd").val());
    console.log(obj);
    $.ajax({
        url: "http://47.95.216.46/api/user/register",
        async: false,
        type: "post",
        dataType: "json",
        data: obj,
        success: function(res) {
            if (res.resCode=="1111"){
                setCookie("user_id",res.data.user_id,30);
                window.location.href='index.html';
            }else {
                alert_msg(res.resMsg)
            }
        },
        error: function() {
            alert_msg(res.resMsg);
        }
    });
}