courtsData = new Mongo.Collection('courts');

// Activities.allow({
//   insert: function(userId, doc) {
//     return doc.userId === userId;
//   }
// });

// Activities.latest = function() {
//   return Activities.find({}, {sort: {date: -1}, limit: 1});
// }

// Meteor.methods({
//   createActivity: function(activity, tweet, loc) {
//     check(Meteor.userId(), String);
//     check(activity, {
//       recipeName: String,
//       text: String,
//       image: String
//     });
//     check(tweet, Boolean);
//     check(loc, Match.OneOf(Object, null));
    
//     activity.userId = Meteor.userId();
//     activity.userAvatar = Meteor.user().services.twitter.profile_image_url_https;
//     activity.userName = Meteor.user().profile.name;
//     activity.date = new Date;
    
//     if (! this.isSimulation && loc)
//       activity.place = getLocationPlace(loc);
    
//     var id = Activities.insert(activity);
    
//     if (! this.isSimulation && tweet)
//       tweetActivity(activity);
    
//     return id;
//   }
// });


if (Meteor.isServer) {
// Initialize a seed activity
Meteor.startup(function() {
  if (Meteor.isServer && courtsData.find().count() === 0) {
    courtsData.insert({
      index: 1,
      name: '北京人济高尔夫俱乐部',
      city: '北京',
      cityCode: 'bj',
      hole:18,
      pars:[4,3,4,4,3,5,4,4,5,5,4,3,5,4,3,4,4,4],
      date: new Date
    });

    courtsData.insert({
      index: 2,
      name: '北京万柳高尔夫俱乐部',
      city: '北京',
      cityCode: 'bj',
      hole:18,
      pars:[4,3,5,4,5,4,3,4,4,4,4,4,5,5,3,4,4,3],
      date: new Date
    });

    courtsData.insert({
      index: 3,
      name: '北京太伟高尔夫俱乐部',
      city: '北京',
      cityCode: 'bj',
      hole:18,
      pars:[4,5,4,5,3,4,4,3,4,4,5,4,3,4,4,4,3,5],
      date: new Date
    });

     courtsData.insert({
      index: 1,
      name: '上海协和高尔夫俱乐部',
      city: '上海',
      cityCode: 'sh',
      hole:18,
      pars:[5,4,4,3,4,5,3,4,4,4,5,4,4,3,5,4,3,4],
      date: new Date
    });

     courtsData.insert({
      index: 1,
      name: '万宁兴隆康乐园太阳河俱乐部',
      city: '海南',
      cityCode: 'hn',
      hole:18,
      pars:[4,4,5,3,5,4,4,3,4,4,3,5,4,4,4,3,5,4],
      date: new Date
    });

     courtsData.insert({
      index: 2,
      name: '万宁兴隆康乐园温泉球场',
      city: '海南',
      cityCode: 'hn',
      hole:18,
      pars:[4,3,4,4,4,3,5,4,5,4,5,4,4,3,5,4,3,4],
      date: new Date
    });

     courtsData.insert({
      index: 3,
      name: '康乐园橡树林球场',
      city: '海南',
      cityCode: 'hn',
      hole:18,
      pars:[4,5,3,5,4,3,4,4,4,5,4,4,3,4,4,5,3,4],
      date: new Date
    });

     courtsData.insert({
      index: 4,
      name: '陵水香水湾高尔夫俱乐部',
      city: '海南',
      cityCode: 'hn',
      hole:18,
      pars:[4,3,4,5,4,5,3,4,5,4,5,4,4,3,4,4,3,4],
      date: new Date
    });

    courtsData.insert({
      index: 5,
      name: '琼海白石岭高尔夫俱乐部',
      city: '海南',
      cityCode: 'hn',
      hole:18,
      pars:[4,5,4,4,3,5,4,3,4,5,4,4,5,3,4,3,4,4],
      date: new Date
    });

    courtsData.insert({
      index: 6,
      name: '三亚红峡谷高尔夫俱乐部-AB场',
      city: '海南',
      cityCode: 'hn',
      hole:18,
      pars:[4,4,4,3,5,4,3,4,4,4,4,5,3,4,4,3,4,6],
      date: new Date
    });

    courtsData.insert({
      index: 7,
      name: '三亚红峡谷高尔夫俱乐部-AC场',
      city: '海南',
      cityCode: 'hn',
      hole:18,
      pars:[4,4,4,3,5,4,3,4,4,4,4,5,3,4,4,4,3,5],
      date: new Date
    });

     courtsData.insert({
      index: 8,
      name: '三亚红峡谷高尔夫俱乐部-BC场',
      city: '海南',
      cityCode: 'hn',
      hole:18,
      pars:[4,4,5,3,4,4,3,4,6,4,4,5,3,4,4,4,3,5],
      date: new Date
    });

    courtsData.insert({
      index: 1,
      name: '东京都高尔夫俱乐部',
      city: '河北',
      cityCode: 'hb',
      hole:18,
      pars:[4,5,3,4,4,5,4,3,4,4,3,4,4,5,4,3,5,4],
      date: new Date
    });

    courtsData.insert({
      index: 2,
      name: '唐山南湖国际高尔夫俱乐部',
      city: '河北',
      cityCode: 'hb',
      hole:18,
      pars:[4,3,5,4,4,4,3,4,5,5,4,4,3,4,4,4,3,5],
      date: new Date
    });
  }
});

}


