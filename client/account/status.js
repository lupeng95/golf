(function(){
	Template.status.helpers({
		foo : function () {
			return Meteor.user()._id;
		},
		faa : function(userId){
		var users =	Meteor.users.find({username:"18618450320"});
	    var id =users.fetch()[0]._id;
		return id;
		}
	});
	
})();
