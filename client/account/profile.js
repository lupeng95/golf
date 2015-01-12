Template.profile.helpers({
		userid : function () {
			return Meteor.user()._id;
		},
		usernick : function () {
			return Meteor.user().profile.nick_name;
		},
		avtarurl : function () {
			return Meteor.user().profile.avtar_url;
		},
		username : function () {
			return Meteor.user().username;
		},
		fetchUserId : function(phone){
		var users =	Meteor.users.find({username: phone});
        var id =users.fetch()[0]._id;
		return id;
		},
		profile : function(){
		var user =	Meteor.users.find({_id: Meteor.user()._id});
		return user;
		},
<<<<<<< HEAD
=======
		noLoginUser:function(){
			Router.go("/sign-in")
		}
>>>>>>> 81b732e5abeae271949e807f092f7aaf16db92a3
	});
	
Template.profile.events({
    'click #logout-btn': function (event, template) {
      event.preventDefault();
     Meteor.logout(function (error, result){
        if(!error){//这里后面需要增加更多判断，按照状态编码
        	Router.go("/")
          return true;
        }else{
          Session.set(ERROR_MESSAGE, "登出失败!");
          return false;
        }
         Session.set(USER_TEL,tel);
      });
    },
    'click img-inc': function () {
      Router.go('avatar-n');
    }
});
