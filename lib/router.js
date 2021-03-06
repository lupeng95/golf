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
  //loadingTemplate: 'appLoading'
  loadingTemplate: 'spinner'
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
  this.route('home', {path: '/'});
  //this.route('landing', {path: '/'});
  this.route('match', {path: '/match'});
  this.route('feed');
  this.route('recipes');
  this.route('bookmarks');
  this.route('about');
  this.route('friendadd');
  this.route('recipe', {path: '/recipes/:name'});
  this.route('admin', { layoutTemplate: null });
  this.route('matchpersoncardQR',{path:'/matchpersoncardQR/:_id'});
  this.route('matchhole', {path: '/matchhole/:_id'});
  this.route('userinfo', {path: '/userinfo'});
  this.route('userinfo', {path: '/userinfo/:_id'});
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
  this.route('editYourAvatarModal', {path: '/avatar'});
});

// Router.route('timeline', {
//   path: '/timeline',
//   onBeforeAction: function() {
//     if (Meteor.user()){
//        this.redirect('/timeline/'+Meteor.userId());
//     }else{
//       Router.go('/sign-in');
//     }
       
//   }
// });



Router.route('timeline', {
  path: '/timeline/:_id',
  // onBeforeAction: function() {
  //   if (!Meteor.user()){
  //     Router.go('/sign-in');
  //   }
       
  // },
  waitOn: function() {
    return [
      //Meteor.subscribe('courts')
      Meteor.subscribe('status', this.params._id)  
    ];
  },
  data: function() {
    //return courtsData.find({city:"北京"}, {sort: {index : -1}});
  }
});

Router.route('timeline', {
  path: '/timeline/:_type/:_id',

  waitOn: function() {
    return [

     
    ];
  },
  data: function() {
  
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
  path: '/matchcaddie/:_id/:_tel',
  waitOn: function() {
    return [
      Meteor.subscribe('courts'),
      Meteor.subscribe('userData', this.params._tel)
     
    ];
  },
  data: function() {
    var d={}
    d.player = Meteor.users.findOne({username:this.params._tel})
    d.court= courtsData.findOne(this.params._id);
    return d;
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

Router.route('mystatus', {
  path: '/mystatus',
  waitOn: function() {
    return [
      //Meteor.subscribe('courts')
     
    ];
  },
  data: function() { 
    //return courtsData.findOne(this.params._id);
  }
});

Router.route('matchview', {
  path: '/matchview/:_id',
  waitOn: function() {
    return [
      Meteor.subscribe('match',this.params._id)
     
    ];
  },
  data: function() {
    return matchData.findOne(this.params._id);
  }
});

Router.route('friendlist', {
  path: '/friendlist',
  waitOn: function() {
    return [
      Meteor.subscribe('myFriendList'),
      Meteor.subscribe('friendStatuslist')
     
    ];
  },
  data: function() {
    return friendData.find({},{ sort: {"profile.nick_name": -1}});
  }
});

Router.route('rank', {
  path: '/rank/:_type',
  waitOn: function() {
    return [
      Meteor.subscribe('friendRanklist') 
    ];
  },
  data: function() {  

    var m = parseInt(moment().format("M"))-1;
    var ind=['aTotal','aPush','aOn','aSon'];
    var t = ind[this.params._type]
    var rank
    if(t=='aTotal'){
      rank = rankData[m].find({},{ limit: 10 ,sort: {aTotal: 1}});
    }
    if(t=='aPush'){
      rank = rankData[m].find({},{ limit: 10 ,sort: {aPush: 1}});
    }
    if(t=='aOn'){
      rank = rankData[m].find({},{ limit: 10 ,sort: {aOn: -1}});
    }
    if(t=='aSon'){
      rank = rankData[m].find({},{ limit: 10 ,sort: {aSon: -1}});
    }
        

    return rank
  }
});


function verifyLoginUser(pause){
  if (Meteor.user()){
      //this.next();
    }else{
      this.render('sign-in');
       pause();
      //Router.go('/sign-in');
      //this.redirect('/sign-in')
    }
}

Router.onBeforeAction(verifyLoginUser,{only: ['matchperson1','mystatus','avatar','editYourAvatarModal','friendlist','userinfo','timeline','profile']});
Router.onBeforeAction('dataNotFound', {only: 'recipe'});