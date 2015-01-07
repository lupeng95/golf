matchData = new Mongo.Collection('match');

matchData.allow({
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
  addMatch: function(match) {
    // check(Meteor.userId(), String);
    // check(activity, {
    //   recipeName: String,
    //   text: String,
    //   image: String
    // });
  
    if (Meteor.userId()===match.userId){
    	match.valid = 1;
    }else{
    	match.valid = 0;
    }

    match.createdAt = new Date;
    
    var id = matchData.insert(match);
    
    return id;
  }
});