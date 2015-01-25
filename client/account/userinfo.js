
var id;
var user;

Template.userinfo.created = function() {
  id = Router.current().params._id;
  if(!id){
    id = Meteor.userId();
  }
  
  user = Meteor.users.findOne(id);
};

Template.userinfo.rendered = function() {

   Meteor.subscribe('myFriend', id,function(){
    var friend = friendData.findOne({fID:id,myID:Meteor.userId()});
    if(friend){
      //$("#btn-ok").remove();
    }else{
      // $("#btn-ok").removeAttr("disabled")
      // $("#btn-ok").html("加好友");
      $("nav .right").html('<a class="menu-btn"  id="btn-ok">加好友</a>');
    }
   });
   if(!user){
     Meteor.subscribe('getUser', id,function(){
     });

   }
};

Template.userinfo.helpers({
 getUser:function(){
  user = Meteor.users.findOne(id);
   return user;
 },
 getRecord:function(id){
  Meteor.subscribe('userMatch', id,1,function(){
    
  });

  var match = matchData.findOne({userID:id},{ sort: {createdAt: -1}});

    if(match){
      return match;
    }
  
 },
 checkFriend:function(){
 }
});

Template.userinfo.events({
  'click #btn-ok':function(event, template) {
    event.preventDefault();
    $("#btn-ok").attr("disabled","true");
    $("#btn-ok").html("请稍等");
    Meteor.call('addMyFriend', user._id, function(error, result) {
    Session.set("SMSG","添加成功");
    Router.go("/friendlist");
        });
  },
  'click #equipBtn':function(event, template) {
    event.preventDefault();
    var stat = $(event.currentTarget).attr("stat");
    if(stat==1){
      $("#equipBtnText").html('展开&nbsp;<span class="glyphicon glyphicon-chevron-down" ></span>');
      $(".equipItem").hide();
      $(event.currentTarget).attr("stat","0");
    }else{
      $("#equipBtnText").html('收起&nbsp;<span class="glyphicon glyphicon-chevron-up" ></span>');
      $(".equipItem").show();
      $(event.currentTarget).attr("stat","1");
    }

  },
 

});