(function(){
  var validatePassword = function(password,confirmPassword){
    if(password === confirmPassword){
       return true;
    }
    return false;
  };
  
  Template.signUp.events({
    'submit #register-form' : function(event, template) {
      event.preventDefault();
      Session.set(ERROR_MESSAGE,null);
      var nikeName = template.find('#nick-name').value;
      var password = template.find('#account-password').value;
      var confirmPassword = template.find('#confirm-password').value;
      var tel = Session.get(USER_TEL);
      
      if(!nikeName){
        Session.set(ERROR_MESSAGE,"请填写昵称");
        return;
      }
      if(nikeName.length<3){
        Session.set(ERROR_MESSAGE,"昵称太短");
        return;
      }
      //check password
      if(!validatePassword(password,confirmPassword)){
        Session.set(ERROR_MESSAGE,"两次密码不一致");
        return;
      }
      if(!validateSMSPassed()){
        Session.set(ERROR_MESSAGE,"验证码未验证");
        return;
      }
  
      //Create account

      AVATAR = "data:image/jpeg;base64,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";//default avatar
      Accounts.createUser({username : Session.get(SMS_CODE), password : password, profile : {nick_name: nikeName, avatar: AVATAR}},
        function(err){
          if (err) {
            if(err.error === 403){
              Session.set(ERROR_MESSAGE,"用户已经存在");
            }else{
              Session.set(ERROR_MESSAGE,err.reason);
            }
          } else {
             Session.set(ERROR_MESSAGE,null);
             Session.set(USER_TEL,null);
             Session.set(SMS_CODE,null);
             Session.set(SMS_VALIDATE,null);
            Router.go('/');
          }

        });
      return false;
    }
  });
})();
