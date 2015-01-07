// validate sms code
Template.validateSmsReset.events({
    'click #validate-sms' : function(event, template) {
      event.preventDefault();
      Session.set(ERROR_MESSAGE,null);
      smsCode = template.find('#smscode').value;

      //check smscode ;
      if(!validateSMSCode(smsCode)){
          Session.set(ERROR_MESSAGE,"验证码不正确");
          return;
      }
      Session.set(SMS_VALIDATE,true);
      Router.go('/reset-password');
      return false;
    },
    'click #smscode-btn-nav' : function(event, template) {
      event.preventDefault();
      Session.set(ERROR_MESSAGE,null);
      smsCode = template.find('#smscode').value;

      //check smscode ;
      if(!validateSMSCode(smsCode)){
          Session.set(ERROR_MESSAGE,"验证码不正确");
          return;
      }
      Session.set(SMS_VALIDATE,true);
      Router.go('/reset-password');
      return false;
    }
  });

  Template.validateSmsReset.helpers({
    errorMessage : function() {
    if(Session.get(ERROR_MESSAGE)){
      return true;
    }
  return;
  }
});
