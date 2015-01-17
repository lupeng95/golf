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

  
    if (Meteor.userId()){
      var f = Meteor.users.findOne(userID);
      if(f){
        var e = friendData.findOne({fID:userID,myID:Meteor.userId()})
        if(e){
          return 0;
        }else{
          
          var friend = {}
          friend.myID = Meteor.userId();
          friend.fID = userID;
          friend.fName = f.profile.nick_name;
          friend.fAvtar = f.profile.avtar_url;
          friend.createdAt = new Date;
          var id = friendData.insert(friend);
      
          return id;
        }
        
      }else{
        return 0;
      }

      
    }else{
    	return 0;
    }


    
    
  }
});

}