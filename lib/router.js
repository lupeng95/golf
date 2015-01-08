var feedSubscription;

// Handle for launch screen possibly dismissed from app-body.js
dataReadyHold = null;

// Global subscriptions
if (Meteor.isClient) {
  Meteor.subscribe('news');
  Meteor.subscribe('bookmarkCounts');
  feedSubscription = Meteor.subscribe('feed');
}

Router.configure({
  layoutTemplate: 'appBody',
  notFoundTemplate: 'notFound',
  loadingTemplate: 'appLoading'
});

if (Meteor.isClient) {
  // Keep showing the launch screen on mobile devices until we have loaded
  // the app's data
  dataReadyHold = LaunchScreen.hold();
}

HomeController = RouteController.extend({
  onBeforeAction: function() {
    Meteor.subscribe('latestActivity', function() {
      dataReadyHold.release();
    });
  }
});

FeedController = RouteController.extend({
  onBeforeAction: function() {
    this.feedSubscription = feedSubscription;
  }
});

RecipesController = RouteController.extend({
  data: function() {
    return _.values(RecipesData);
  }
});

BookmarksController = RouteController.extend({
  onBeforeAction: function() {
    if (Meteor.user())
      Meteor.subscribe('bookmarks');
    else
      Overlay.open('authOverlay');
  },
  data: function() {
    if (Meteor.user())
      return _.values(_.pick(RecipesData, Meteor.user().bookmarkedRecipeNames));
  }
});

RecipeController = RouteController.extend({
  onBeforeAction: function() {
    Meteor.subscribe('recipe', this.params.name);
  },
  data: function() {
    return RecipesData[this.params.name];
  }
});

AdminController = RouteController.extend({
  onBeforeAction: function() {
    Meteor.subscribe('news');
  }
});

// MatchpersonController = RouteController.extend({
//   onBeforeAction: function() {
//     Meteor.subscribe('courts');
//   },
//   data: function() {
//     //return courtsData.find({city:"北京"}, {sort: {index : -1}});
//     console.log("aaa")
//     return courtsData.find();
//   }
// });



Router.map(function() {
<<<<<<< HEAD
  this.route('landing', {path: '/'});
=======
  //this.route('landing', {path: '/'});
  this.route('home', {path: '/'});
  this.route('home', {path: '/home'});
>>>>>>> 4fbd4dacd8b3b062f98c2fcf9097121b85044e7a
  this.route('match', {path: '/match'});
  this.route('feed');
  this.route('recipes');
  this.route('bookmarks');
  this.route('about');
  this.route('recipe', {path: '/recipes/:name'});
  this.route('admin', { layoutTemplate: null });
  this.route('matchpersoncardQR',{path:'/matchpersoncardQR/:_id'});
  this.route('matchhole', {path: '/matchhole/:_id'});
  //this.route('home', {path: '/home'});
  // accounts
  this.route('signIn', {path: '/sign-in'});
  this.route('signUp', {path: '/sign-up'});
  this.route('enterTel', {path: '/enter-tel'});
  this.route('validateSms', {path: '/validate-sms'});
  this.route('enterTelReset', {path: '/enter-tel-reset'});
  this.route('validateSmsReset', {path: '/validate-sms-reset'});
  this.route('resetPassword', {path: '/reset-password'});
  this.route('status', {path: '/status'});
  this.route('profile', {path: '/profile'});
});

Router.route('timeline', {
  path: '/timeline',
  onBeforeAction: function() {
    if (Meteor.user()){
       Router.go('/timeline')
    }else{
      Router.go('/sign-in');
    }
       
  }
});

Router.route('timeline', {
  path: '/timeline/:_id',
  onBeforeAction: function() {
    if (!Meteor.user()){
      Router.go('/sign-in');
    }
       
  },
  waitOn: function() {
    return [
      //Meteor.subscribe('courts')
      //Meteor.subscribe('userMatch', this.params._id,2)
     
    ];
  },
  data: function() { 
    //return courtsData.find({city:"北京"}, {sort: {index : -1}});
  }
});

Router.route('matchperson1', {
  path: '/matchperson',
  waitOn: function() {
    return [
      Meteor.subscribe('courts')
     
    ];
  },
  data: function() { 
    return courtsData.find({city:"北京"}, {sort: {index : -1}});
  }
});


Router.route('matchperson2', {
  path: '/matchpersoncard/:_id',
  waitOn: function() {
    return [
      Meteor.subscribe('courts')
     
    ];
  },
  data: function() { 
    return courtsData.findOne(this.params._id);
  }
});

Router.route('matchcaddie', {
  path: '/matchcaddie/:_id',
  waitOn: function() {
    return [
      Meteor.subscribe('courts')
     
    ];
  },
  data: function() { 
    return courtsData.findOne(this.params._id);
  }
});

Router.route('matchcaddie', {
  path: '/matchcaddie',
  waitOn: function() {
     Meteor.subscribe('courts')
  },
  data: function() { 
    //return courtsData.findOne(this.params._id);
  }
});


Router.route('matchcard', {
  path: '/matchcard',
  waitOn: function() {
    return [
      Meteor.subscribe('courts')
     
    ];
  },
  data: function() { 
    //return courtsData.findOne(this.params._id);
  }
});

Router.route('matchplayer', {
  path: '/matchplayer/:_id',
  waitOn: function() {
    return [
      //Meteor.subscribe('courts')
     
    ];
  },
  data: function() { 
    //return courtsData.findOne(this.params._id);
  }
});

Router.onBeforeAction('dataNotFound', {only: 'recipe'});