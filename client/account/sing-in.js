 Template.signIn.events({
    'submit #login-form' : function(event, template){
      event.preventDefault();
      Session.set( "errorMessage",null);
      var tel = template.find('#account-tel').value,
      password = template.find('#login-password').value;
        Meteor.loginWithPassword(tel, password, function(err){
        if (Meteor.user()){
          Router.go('home');
          }
        else{
          Session.set( "errorMessage", "密码错误或者电话不存在");
          return;
        }
      });
         return false;
      },
    'click #signup-btn' : function(event, template){
      Session.set( "errorMessage",null);
      Router.go("signUp");
    }
  });
Template.signIn.errorMessage = function() {
  if(Session.get("errorMessage")){
    return true;
  }
return;
};

