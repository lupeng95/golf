Template.resetPassword.events({
  'submit #reset-form' : function(event, template) {
    event.preventDefault();
    Session.set(ERROR_MESSAGE,null);
    password = template.find('#account-password').value;
    confirmPassword = template.find('#confirm-password').value;

    if(!validateSMSPassed){
       Session.set(ERROR_MESSAGE,"手机码未验证");
       return;
      }

    //check password
    if(!validatePassword(password,confirmPassword)){
      Session.set(ERROR_MESSAGE,"两次密码不一致");
      return;
    }
    //reset account password
    Meteor.call("resetUserPassword",Session.get(USER_TEL),password,function (error, result){
      if(!error){//这里后面需要增加更多判断，按照状态编码
       Router.go('/sign-in');
      }else{
        Session.set(ERROR_MESSAGE, error);
      }
    });
    Session.set(USER_TEL,null);
    return false;
  }
});

