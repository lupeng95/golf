(function(){
  var validateSMSCode = function(tel,smsCode){
    var orgCode =Session.get(tel);
    if(orgCode && (orgCode === smsCode)){
       return true;
    }else{
      return false;
    }
  };

  var validatePassword = function(password,confirmPassword){
    if(password === confirmPassword){
       return true;
    }
    return false;
  };

  Template.signUp.events({
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
      //Create account
      Accounts.createUser({username : tel, password : password, profile : {avtar_url: 'default_url'}}, function(err){
          if (err) {
            if(err.error === 403){
              Session.set( "errorMessage","用户已经存在");
            }
          } else {
          }

        });
      Router.go('/home'); // change to home later.
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

  Template.signUp.errorMessage = function() {
    if(Session.get("errorMessage")){
      return true;
    }
  return;
  };
})();
