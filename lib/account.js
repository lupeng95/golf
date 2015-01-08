SecCode = new Mongo.Collection('SecCode');
//constants
SMS_VALIDATE = "smsValidated";
ERROR_MESSAGE = "errorMessage";
USER_TEL = "userTel";
SMS_CODE = "smsCode";

ensureSignedIn = function() {                                                                          // 168
    if (!Meteor.user()) {
        Session.set(ERROR_MESSAGE,null);                                                                                                   // 174
        Router.go('/sign-in');
    } else {                                                                                          // 191
        Router.go('/profile');                                                                                            // 192
    }                                                                                                                  // 193
};
validateSMSCode = function(smsCode){
    var sentSMSCode =Session.get(SMS_CODE);
    if(sentSMSCode && (sentSMSCode == smsCode)){
       Session.set(SMS_CODE,null);
       return true;
    }else{
      return false;
    }
  };

validateSMSPassed = function(){
  return Session.get(SMS_VALIDATE);
};

validatePassword = function(password,confirmPassword){
    if(password === confirmPassword){
       return true;
    }
    return false;
  };

userExist = function(tel){
  if(Meteor.users.find({username:tel}).count()>0){
    return true;
  }
  return false;
};

userLogin = function(){
  if(Meteor.user()){
    return true;
  }
  return false;
};

//get _id by useranme
getUserId = function(tel){// tel is as "username".
      var user = Meteor.users.find({username:tel});
      var userId =user.fetch()[0]._id;
      return userId;
  };

//accounts global function.
Handlebars.registerHelper('userLogin', function() {
   if(Meteor.user()){
    return true;
  }
  return false;
  }
);
