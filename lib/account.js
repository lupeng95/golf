// FS.debug = true 
SecCode = new Mongo.Collection('SecCode');
avaterBaseURL = "http://127.0.0.1:4000/"
avaterLoadImage = "img/";
//constants
SMS_VALIDATE = "smsValidated";
ERROR_MESSAGE = "errorMessage";
USER_TEL = "userTel";
SMS_CODE = "smsCode";
USER_EXIST = "userExist";
AVATAR = "data:image/jpeg;base64,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";

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

//计算球龄
Handlebars.registerHelper('calBallAge', function(ballAgeMS) {
  var years = moment(ballAgeMS*1000).fromNow(true);
  var numberYears = years.match(/\d+/);
  return numberYears;
  }
);

Handlebars.registerHelper('errorMessage', function() {
    if(Session.get(ERROR_MESSAGE)){
      return true;
    }
  return false;
  }
);
Handlebars.registerHelper('getUserAvatar', function(userId) {
    // var existedAvatar = Images.findOne({key: userId});
    
    // if(!existedAvatar){ // create new
    //   return AVATAR;
    // }
   return avaterBaseURL+avaterLoadImage+userId;
});

Handlebars.registerHelper('userPhoneNumber', function() {
        if(Meteor.user())
            return Meteor.user().username;
        else
            return false;
    }
);

Handlebars.registerHelper('getGGN', function() {
        if(Meteor.user())
            return Meteor.user().golf_number;
        else
            return false;
    }
);


Handlebars.registerHelper('getProfile', function() {
        if(Meteor.user())
            return Meteor.user().profile;
        else
            return ;
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


if (Meteor.isServer) {
  Meteor.users.deny({
    update:function (userId, doc, fieldNames, modifier){

      if(fieldNames.length>1 || !_.contains(fieldNames,"profile")){
        return true;
      }

      friendData.update({fID:doc._id},{$set: {'fName': doc.profile.nick_name}})
      var dd = moment().format('YYYY-M').split("-")

      rankData[dd[1]-1].update({userID:doc._id},{$set: {'username': doc.profile.nick_name}})
      
      return false;
    }
  });

}


