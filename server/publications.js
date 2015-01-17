Meteor.publish('bookmarkCounts', function() {
  return BookmarkCounts.find();
});

Meteor.publish('news', function() {
  return News.find({}, {sort: {date: -1}, limit: 1});
});

Meteor.publish('latestActivity', function () {
  return Activities.latest();
});

Meteor.publish('feed', function() {
  return Activities.find({}, {sort: {date: -1}, limit: 10});
});

Meteor.publish('recipe', function(name) {
  check(name, String);
  return [
    BookmarkCounts.find({recipeName: name}),
    Activities.find({recipeName: name})
  ];
});

// autopublish the user's bookmarks and admin status
Meteor.publish(null, function() {
  return Meteor.users.find(this.userId, {
    fields: {
      admin: 1,
      bookmarkedRecipeNames: 1,
      'services.twitter.profile_image_url_https': 1
    }
  });
})

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
 
