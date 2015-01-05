ensureSignedIn = function() {                                                                          // 168
    if (!Meteor.user()) {
        Session.set( "errorMessage",null);                                                                                                   // 174
        Router.go('/sign-in');
    } else {                                                                                          // 191
        Router.go('/profile');                                                                                            // 192
    }                                                                                                                  // 193
};
validateSMSCode = function(tel,smsCode){
    var orgCode =Session.get(tel);
    if(orgCode && (orgCode === smsCode)){
       return true;
    }else{
      return false;
    }
  };

validatePassword = function(password,confirmPassword){
    if(password === confirmPassword){
       return true;
    }
    return false;
  };

//get _id by useranme
getUserId = function(username){
      var user = Meteor.users.find({username:username});
      var userId =user.fetch()[0]._id;
      return userId;
  };