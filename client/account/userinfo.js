
var id;
var user;
var _status = "保密,未婚,已婚";
var _sex = "保密,男,女";
var _position= "未知,主管,经理,总监,副总裁,总裁,首席执行官,董事长,职员";
var _profession= "未知,金融,互联网/IT,商务服务,贸易,交通/运输,文化/传媒/娱乐/体育,政府,房地产,其他";
var _driver = "未知,TaylorMade,Titlelist,Callaway,Honma,Mizuno,XXIO,Nike,Srixon,PING,Cleveland,Adams,Maruman,Wilson,MacGregor,KATANA SWORD,KASCO,Nickent,YONEX,George Spirits,Cobra,GIII,PRGR,DUNLOP,EPON,Tourstage,WILLIAMS";
var _fairway_wood = "未知,TaylorMade,Titlelist,Callaway,Honma,Mizuno,XXIO,Cleveland,Nike,Adams,Maruman,Srixon,PING,Wilson,MacGregor,KATANA SWORD,YONEX,Nickent,George Spirits,Cobra,KASCO,GIII,PRGR,DUNLOP,EPON,Tourstage,WILLIAMS";
var _hybrid = "未知,TaylorMade,Titlelist,Callaway,Honma,Mizuno,XXIO,Nike,Adams,Srixon,PING,MacGregor,Yamaha,KASCO,GIII,Tourstage,PRGR,EPON,Nickent,WILLIAMS";
var _irons = "未知,TaylorMade,Titlelist,Callaway,Honma,Mizuno,XXIO,Maruman,PING,Adams,Nike,Srixon,MacGregor,Wilson,Cleveland,Yamaha,KASCO,GIII,Tourstage,PRGR,EPON,Scrach,Nickent,WILLIAMS,YONEX";
var _wedges="未知,Titlelist,TaylorMade,Cleveland,Callaway,Honma,Mizuno,XXIO,Maruman,Nike,PING,Adams,S-Yard,Srixon,Cobra,Wilson,MacGregor,Tourstage,PRGR,EPON,Scrach,KASCO,Nickent,WILLIAMS,YONEX";
var _putter ="未知,TaylorMade,Titlelist,PING,Odyssey,Honma,Mizuno,XXIO,Nike,Yes!,Cleveland,Adams,MacGregor,Bettinardi,Maruman,Cobra,Wilson,Srixon,S-Yard,Tourstage,PRGR,EPON,Scrach,KASCO,WILLIAMS,YONEX";
var _shoe = "未知,FOOTJOY,Adidas,Nike,ECCO,Mizuno,ECCO,Adidas,YONEX ,DUNLOP,TRAX,Oakley,NUMBER,TRUE linkswear,Nike,Mizuno,昕风采";


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
  //添加用户会籍信息
  var membership = user.profile.membership;
  for(m in membership){
      var sBr = membership[m].lastIndexOf("<br>");
      var mm = membership[m].substr(0,sBr);
      mm = mm.replace("<br>"," ,");
  $('#membership-club-p').append("<p>"+mm +"</p>");
  }
  //添加用户爱好信息
  var hobby = user.profile.hobby;
  var temp = '';
  for(m in hobby){
  temp=temp+hobby[m].substr(0,hobby[m].lastIndexOf("<br>")).substr(4)+" ,";
  }
  $('#membership-hobby-p').append("<p>"+temp.substr(0,temp.length-1) +"</p>");

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
 },
 getSex:function(){
  return _sex.split(",")[user.profile.sex];
 },
 getStatus:function(){
  return _status.split(",")[user.profile.sex];
 },
 getDriver:function(){
  return _driver.split(",")[user.profile.driver];
 },
 getFairwayWood:function(){
  return _fairway_wood.split(",")[user.profile.fairway_wood];
 },
 getHybrid:function(){
  return _hybrid.split(",")[user.profile.hybrid];
 },
 getIrons:function(){
  return _irons.split(",")[user.profile.irons];
 },
 getWedges:function(){
  return _wedges.split(",")[user.profile.wedges];
 },
 getPutter:function(){
  return _putter.split(",")[user.profile.putter];
 },
 getShoe:function(){
  return _shoe.split(",")[user.profile.shoe];
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