


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
 getStatus:function(uid){
  //var m = parseInt(moment().format("M"))-1;
  var status = last5Data.findOne({userID:uid});
  var aTotal = 0;
  var aPut = 0;
  if(status){
    aTotal = status['total']
    aPut = status['push']
  }
  return "总杆:"+aTotal+" 推杆:"+aPut;
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