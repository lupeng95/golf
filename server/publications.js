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
  return matchData.find(cond,{ limit: limit ,sort: {createdAt: -1}});
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

 
