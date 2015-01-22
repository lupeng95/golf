SecCode = new Mongo.Collection('SecCode');
//constants
SMS_VALIDATE = "smsValidated";
ERROR_MESSAGE = "errorMessage";
USER_TEL = "userTel";
SMS_CODE = "smsCode";
USER_EXIST = "userExist";

Images = new FS.Collection("images", {
  stores: [new FS.Store.FileSystem("images", {path: "~/uploads"})]
});

validateImgBase64 = function(src){
    if(!/^data:image\/png;base64,/i.test(src)){
        throw new Error("Image is not decode 1");
    }
  };

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
Handlebars.registerHelper('errorMessage', function() {
    if(Session.get(ERROR_MESSAGE)){
      return true;
    }
  return false;
  }
);
Handlebars.registerHelper('userImage', function(userId) {
            return Images.findOne({key: userId}).url();
});

Handlebars.registerHelper('userPhoneNumber', function() {
        if(Meteor.user())
            return Meteor.user().username;
        else
            return false;
    }
);

Handlebars.registerHelper('nickName', function() {
        if(Meteor.user())
            return Meteor.user().profile.nick_name;
        else
            return false;
    }
);
Handlebars.registerHelper('equipments', function() {
        if(Meteor.user())
            return Meteor.user().profile.equipments;
        else
            return false;
    }
);
Handlebars.registerHelper('userId', function() {
        if(Meteor.user())
            return Meteor.user()._id;
        else
            return false;
    }
);


