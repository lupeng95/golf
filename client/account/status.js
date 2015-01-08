Template.status.helpers({
    userid : function () {
      return Meteor.users()._id;
    },
    usernick : function () {
      return Meteor.user().profile.nick_name;
    },
    avtarurl : function () {
      return Meteor.user().profile.avtar_url;
    },
    username : function () {
      check(Meteor.user().username);
      return Meteor.user().username;
    },
    fetchUserId : function(phone){
    var users = Meteor.users.find({username: phone});
        var id =users.fetch()[0]._id;
    return id;
    },
    profile : function(){
    var user =  Meteor.users.find({_id: Meteor.user()._id});
    return user;
    }

	});
	
Template.status.events({
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
