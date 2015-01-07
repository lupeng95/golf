	
Template.logOutButton.events({
    'click #logout-btn': function (event, template) {
      event.preventDefault();
     Meteor.logout(function (error, result){
        if(!error){
          return true;
        }else{
          Session.set(ERROR_MESSAGE, "登出失败!");
          return false;
        }
         Session.set(USER_TEL,null);
      });
    }
});