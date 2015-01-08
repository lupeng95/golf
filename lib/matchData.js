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

	var total = 0;
    var push = 0;
    var onBase = 0;
    var on = 0;
    var onRate = 0;

    var sOnBase = 0;
    var sOn = 0;
    var sOnRate = 0;

    var data = match.record;

    for (var i in data){
      total+=data[i].total;
      push+=data[i].put;
      if(data[i].par >3){
        onBase++;
        if (data[i].on){
          on++;
        }
      }

      var tt = data[i].par - 2;
      sOnBase++;
      if((data[i].total-data[i].put)<=tt){
        sOn++;
        
      }

    }

    if (onBase == 0){
      onRate = 0
    }else{
      onRate = parseInt(on*100/onBase)
    }

    if(sOnBase!=0){
      sOnRate = parseInt(sOn*100/sOnBase)
    }
    
    match.summary={total:total,push:push}
    match.summary.onRate = onRate; //开球上道率
    match.summary.sOnRate = sOnRate; //标on率



	var total=0;
  
    if (Meteor.userId()===match.userID){
    	match.valid = 1;
    }else{
    	match.valid = 0;
    }

    match.createdAt = new Date;
    
    var id = matchData.insert(match);
    
    return id;
  }
});