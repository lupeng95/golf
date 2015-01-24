friendData = new Mongo.Collection('friend');

if (Meteor.isServer) {
friendData.allow({
  insert: function(userId, doc) {
    return false;
  },
  update:function (userId, doc, fieldNames, modifier){
  	return false;
  },
  remove:function(userId, doc){
  	return false;
  }
});


Meteor.methods({
  addMyFriend: function(userID) {
     check(userID, String);
    // check(activity, {
    //   recipeName: String,
    //   text: String,
    //   image: String
    // });

  
    if (Meteor.userId() && Meteor.userId()!=userID){
      var f = Meteor.users.findOne(userID);
      if(f){
        var e = friendData.findOne({fID:userID,myID:Meteor.userId()})
        if(e){
          return 0;
        }else{
          //my - friend
          var friend = {}
          friend.myID = Meteor.userId();
          friend.fID = userID;
          friend.fName = f.profile.nick_name;
          friend.fAvtar = f.profile.avtar_url;
          friend.fTel = f.username;
          friend.createdAt = new Date;
          var id = friendData.insert(friend);
         
        }

        e = friendData.findOne({fID:Meteor.userId(),myID:userID})

        if(e){
          return 0;
        }else{

          var my = Meteor.user();
          var friend = {}
          friend.myID = userID;
          friend.fID = Meteor.userId();
          friend.fName = my.profile.nick_name;
          friend.fAvtar = my.profile.avtar_url;
          friend.fTel = my.username;
          friend.createdAt = new Date;
          id = friendData.insert(friend);

        }

        return 1;

        
      }else{
        return 0;
      }

      
    }else{
    	return 0;
    }


    
    
  }
});

}