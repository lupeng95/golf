Template.reset.events({
  'submit #register-form' : function(event, template) {
    event.preventDefault();
    Session.set( "errorMessage",null);
    var tel = template.find('#account-tel').value,
    password = template.find('#account-password').value;
    confirmPassword = template.find('#confirm-password').value;
    smsCode = template.find('#smscode').value;
    //check smscode ;
    if(!validateSMSCode(tel,smsCode)){
        Session.set('errorMessage',"验证码不正确");
        return;
    }
    //check password
    if(!validatePassword(password,confirmPassword)){
      Session.set('errorMessage',"两次密码不一致");
      return;
    }
    //get _id by useranme
    var user = Meteor.users.find({username:tel});
    var userId =user.fetch()[0]._id;

    //reset account password
    Meteor.call("resetUserPassword",userId,password,function (error, result){
      if(!error){//这里后面需要增加更多判断，按照状态编码
       Router.go('/home');
      }else{
        Session.set( "errorMessage", error);
      }
    });
    return false;
  },
  'click #smscode-btn': function (event, template) {
    event.preventDefault();
    var tel = template.find('#account-tel').value;
    if(!tel){
      Session.set( "errorMessage", "手机号码不正确");
      return;
    }
    Meteor.call("getSMSCode",tel,function (error, result){
      if(!error){//这里后面需要增加更多判断，按照状态编码
       Session.set(tel,result);
      }else{
        Session.set( "errorMessage", "肯定有什么不太对");//增加状态编码判断后应该不会到这里来，除非服务器有问题.
      }
      
    });

  }
});

Template.reset.errorMessage = function() {
  if(Session.get("errorMessage")){
    return true;
  }
return;
};
