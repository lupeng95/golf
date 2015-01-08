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
      // if(!tel){
      //   Session.set(ERROR_MESSAGE,"手机未验证");
      //   return;
      // }

   

      //Create account
      Accounts.createUser({username : Session.get(SMS_CODE), password : password, profile : {nick_name: nikeName, avtar_url: 'default_url'}},
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
            Router.go('/home');
          }

        });

      //Router.go('/home');
      return false;
    }
  });

Template.signUp.helpers({
    errorMessage : function() {
    if(Session.get(ERROR_MESSAGE)){
      return true;
    }
      return;
    }
  });
})();
