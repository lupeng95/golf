// send smscode
  Template.enterTel.events({
    'click #smscode-btn': function (event, template) {
      event.preventDefault();
      var tel = template.find('#account-tel').value;
      if(!tel){
        Session.set(ERROR_MESSAGE, "手机号码不正确,请重新填写");
        return;
      }
      if(userExist(tel)){
        Session.set(ERROR_MESSAGE, "手机号码已经注册过了!");
        return;
      }
      Meteor.call("getSMSCode",tel,function (error, result){
        if(!error && result.respcode === "000000"){//这里后面需要增加更多判断，按照状态编码
           Session.set(SMS_CODE,result.smscode);
           Session.set(ERROR_MESSAGE,null);//empty errormessage for next page
           Router.go('/validate-sms');
        }else{
          Session.set(ERROR_MESSAGE, "send failed!");//增加状态编码判断后应该不会到这里来，除非服务器有问题.
         return;
        }
         Session.set(USER_TEL,tel);
      });
    },
    'click #smscode-btn-nav': function (event, template) {
      event.preventDefault();
      var tel = template.find('#account-tel').value;
      if(!tel){
        Session.set(ERROR_MESSAGE, "手机号码不正确,请重新填写");
        return;
      }
      if(userExist(tel)){
        Session.set(ERROR_MESSAGE, "手机号码已经注册过了!");
        return;
      }
      Meteor.call("getSMSCode",tel,function (error, result){
        if(!error && result.respcode === "000000"){//这里后面需要增加更多判断，按照状态编码
           Session.set(SMS_CODE,result.smscode);
           Session.set(ERROR_MESSAGE,null);//empty errormessage for next page
           Router.go('/validate-sms');
        }else{
          Session.set(ERROR_MESSAGE, "send failed!");//增加状态编码判断后应该不会到这里来，除非服务器有问题.
          return;
        }
         Session.set(USER_TEL,tel);
      });
    }
  });
Template.enterTel.helpers({
    errorMessage : function() {
    if(Session.get(ERROR_MESSAGE)){
      return true;
    }
  return;
  }
});
