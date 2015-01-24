


Template.friendlist.created = function() {
 
}
Template.friendlist.rendered = function() {
 

}

Template.friendlist.helpers({
 showMSG:function(){
    var msg = Session.get("SMSG");
    if(msg){
       Template.appBody.addNotification({
              action: '确定',
              title: msg,
              callback: function() {

              }
            });
       Session.set("SMSG",false);
    }
   
 },
 getRank:function(uid){
  var m = parseInt(moment().format("M"))-1;
  var rank = rankData[m].findOne({userID:uid});
  var aTotal = 0;
  if(rank){
    aTotal = rank['aTotal']
  }
  return "本月平均总杆:"+aTotal;
 }

 
})

Template.friendlist.events({
  'click #tel':function(event, template) {
    //event.preventDefault(); 


  },
  'click #friendLink':function(event, template) {
    event.preventDefault(); 
    var uid = $(event.currentTarget).parent().attr("uid");
    Router.go("/userinfo/"+uid);
  }
 

});