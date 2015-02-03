Meteor.publish('bookmarkCounts', function() {
  return BookmarkCounts.find();
});

Meteor.publish('news', function() {
  return News.find({}, {sort: {date: -1}, limit: 1});
});

Meteor.publish('images', function() {
  return Images.find();
});




Meteor.publish('courts', function() {
  return courtsData.find();
});


Meteor.publish('userMatch', function(userId,limit) {

  var cond={userID:userId}
  if(userId!=this.userId){
    cond.valid = 1;
  }
  //Meteor._sleepForMs(3000);

  return matchData.find(cond,{ limit: limit ,sort: {createdAt: -1}});
});

Meteor.publish('match', function(id) {


  //Meteor._sleepForMs(3000);

  return matchData.find(id);
});

Meteor.publish('userData',function(tel){
  return Meteor.users.find({username:tel},{
    fields:{
      profile:1,
      username:1,
      createdAt:1
    }
  });
});

Meteor.publish('getUser',function(id){
  return Meteor.users.find({_id:id},{
    fields:{
      profile:1,
      username:1,
      createdAt:1
    }
  });
});

Meteor.publish('myFriend', function(id) {
  return friendData.find({fID:id,myID:this.userId});
});

Meteor.publish('myFriendList', function() {
  return friendData.find({myID:this.userId});
});

Meteor.publish('friendRanklist',function(){
  if(this.userId){
    var friendlist = friendData.find({myID:this.userId},{fields:{fID:1}}).fetch()
    var fidList = _.pluck(friendlist,'fID');
    fidList.push(this.userId)
    
    //console.log(friendlist.fetch())
    var m = parseInt(moment().format("M"))-1;
    var y = parseInt(moment().format("YYYY"));

    var cond={year:y,userID:{$in:fidList}};
    return rankData[m].find(cond);
  }

})

Meteor.publish('friendStatuslist',function(){
  if(this.userId){
    var friendlist = friendData.find({myID:this.userId},{fields:{fID:1}}).fetch()
    var fidList = _.pluck(friendlist,'fID');
    


    var cond={userID:{$in:fidList}};
    return last5Data.find(cond);
  }

})

Meteor.publish('status', function(uid) {
  return statData.find({userID:uid});
});
 
