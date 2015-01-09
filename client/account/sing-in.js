 Template.signIn.events({
    'submit #login-form' : function(event, template){
      event.preventDefault();

      Session.set( "errorMessage",null);
      var tel = template.find('#account-tel').value,
      password = template.find('#login-password').value;
        Meteor.loginWithPassword(tel, password, function(err){
        if (err){
          Session.set(ERROR_MESSAGE, "账号或密码错误!");
        }else{
          Router.go('/');
        }
      });
         return false;
      },
      'submit #smscode-btn-nav' : function(event, template){
      event.preventDefault();
      Session.set(ERROR_MESSAGE,null);
      var tel = template.find('#account-tel').value,
      password = template.find('#login-password').value;
        Meteor.loginWithPassword(tel, password, function(err){
        if (Meteor.user()){
          Router.go('/');
          }
        else{
          Session.set(ERROR_MESSAGE, "账号或密码错误!");
          return;
        }
      });
         return false;
      },
    'click #signup-btn' : function(event, template){
      Session.set(ERROR_MESSAGE,null);
      Router.go('/enter-tel');
    },
    'click #forgot-btn' : function(event, template){
      Session.set(ERROR_MESSAGE,null);
      Router.go('/enter-tel-reset');
    }
  });
