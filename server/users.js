Accounts.onCreateUser(function(options, user) {
  if (options.profile)
    user.profile = options.profile;

  // If this is the first user going into the database, make them an admin
  if (Meteor.users.find().count() === 0)
    user.admin = true;

  return user;
});

Meteor.methods({
    generateGGN: function() {
    var ggn = GGMember.findAndModify({
        query: { _id: ggn_id },
        update: {
            $inc: { ggn: +1 },
            $set: { modif_date: new Date()}
         }
    });
    return ggn;
    }
});

if (Meteor.isServer) {
  Meteor.startup(function () {
    GGMember = new Meteor.Collection('golfMemberNumber');
    var ggn_record = GGMember.find().fetch()[0];
    if(ggn_record){
       ggn_id = ggn_record._id;
       console.log(ggn_id);
    }
    else
    {
       ggn_id = GGMember.insert({ggn:10000,init_date: new Date(),modif_date: new Date()});
       console.log("init ggn number from 10000");
    }
  });
}
