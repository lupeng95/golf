


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

 
})

Template.friendlist.events({
  'click #hole':function(event, template) {
    event.preventDefault(); 


  },
 

});