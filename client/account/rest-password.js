Template.resetPassword.events({
  'submit #reset-form' : function(event, template) {
    event.preventDefault();
    Session.set(ERROR_MESSAGE,null);
    password = template.find('#account-password').value;
    confirmPassword = template.find('#confirm-password').value;

    if(!validateSMSPassed){
       Session.set(ERROR_MESSAGE,"手机未验证");
       return;
      }

    //check password
    if(!validatePassword(password,confirmPassword)){
      Session.set(ERROR_MESSAGE,"两次密码不一致");
      return;
    }
    alert(Session.get(USER_TEL));
    //get _id by useranme
    var user = Meteor.users.find({username: Session.get(USER_TEL)});
    var userId =user.fetch()[0]._id;

    //reset account password
    Meteor.call("resetUserPassword",userId,password,function (error, result){
      if(!error){//这里后面需要增加更多判断，按照状态编码
       Router.go('/home');
      }else{
        Session.set(ERROR_MESSAGE, error);
      }
    });
    Session.set(USER_TEL,null);
    return false;
  }
});

Template.enterTelReset.helpers({
  errorMessage : function() {
    if(Session.get(ERROR_MESSAGE)){
      return true;
    }
  return;
  },
  telNumber : function () {
      return Session.get(USER_TEL);
    },
});
