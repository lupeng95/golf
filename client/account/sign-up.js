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
      
      if(!nikeName){
        Session.set(ERROR_MESSAGE,"请填写昵称");
        return;
      }
      if(nikeName.length<2){
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
    
      Meteor.call("generateGGN",function (error, result){
        Accounts.createUser({username : Session.get(SMS_CODE), password : password,
              profile : {ggn: result.ggn, nick_name: nikeName, sex: 0, status: 0, ball_age: 0,position: 0,
              profession: 0, hobby: '', membership: '', company: '', des: '',
              driver:0,fairway_wood:0,hybrid:0,irons:0,wedges:0,putter:0,shoe:0}},
            function(err){
            if (err) {
              if(err.error === 403){
                Session.set(ERROR_MESSAGE,"用户已经存在");
                return;
              }else{
                Session.set(ERROR_MESSAGE,err.reason);
                return;
              }
            } else {
               Session.set(ERROR_MESSAGE,null);
               Session.set(USER_TEL,null);
               Session.set(SMS_CODE,null);
               Session.set(SMS_VALIDATE,null);
               Router.go('/');
               return true;
            }
          });
      });
   
      return false;
    }
  });
})();
