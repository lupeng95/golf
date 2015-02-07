// send smscode
var countdownHandler ;
var count = 60;

function CountDown(){
  count-=1;
  $("#smsBtn").html("发送("+count+")");
  if(count<=0){
    clearInterval(countdownHandler);
    $("#smsBtn").removeAttr("disabled");
    $("#smsBtn").html("发送验证");
  }
}

  Template.enterTel.events({
   
    'click #smsBtn': function (event, template) {
      event.preventDefault();
      var tel = template.find('#account-tel').value;
      if(!tel){
        Session.set(ERROR_MESSAGE, "手机号码不正确,请重新填写");
        return;
      }
      //check if this tel existied.
      $("#verifyBtn").removeAttr("disabled");
      $('#smscode').focus();
      Session.set(USER_TEL,tel);

      count = 60;
      countdownHandler = setInterval(CountDown, 1000);
      $("#smsBtn").attr("disabled","true");
      $("#smsBtn").html("发送(60)");

      Meteor.call("getSMSCode",tel,false,function (error, result){
        if(result.error){
           Session.set(ERROR_MESSAGE, "手机号码已注册!");
           $("#verifyBtn").attr("disabled","true");
           return;
        }
        if(!error && result.respcode === "000000"){//这里后面需要增加更多判断，按照状态编码
          Session.set(SMS_CODE,result.smscode);
          Session.set(ERROR_MESSAGE,null);//empty errormessage for next page
       
        }else{
          Session.set(ERROR_MESSAGE, "send failed!");//增加状态编码判断后应该不会到这里来，除非服务器有问题.
         return;
        }
      });
    },
    'click #verifyBtn': function (event, template) {
        event.preventDefault();
        Session.set(ERROR_MESSAGE,null);
        smsCode = $('#smscode').val();

        Meteor.call("verifySMSCode",smsCode,Session.get(SMS_CODE),function (error, result){

        if(!error && result.code === 0){//这里后面需要增加更多判断，按照状态编码
           Session.set(ERROR_MESSAGE,null);//empty errormessage for next page
           Session.set(SMS_VALIDATE,true);
           Router.go('/sign-up');
        }else{
          Session.set(ERROR_MESSAGE, "验证码不正确");//增加状态编码判断后应该不会到这里来，除非服务器有问题.
         return;
        }
      });
    }

  });

