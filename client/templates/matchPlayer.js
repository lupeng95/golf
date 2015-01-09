var SMC = "sMatchCard";
var ANIMATION_DURATION = 300;
var card={}

Template.matchplayer.rendered = function() {
  card = Session.get(SMC);

  var id = Router.current().params._id;

  $(document).ready(function() {
  	Meteor.setTimeout(function() {
    	$("input").eq(0).focus()
  	}, ANIMATION_DURATION);
	
  })
}

Template.matchplayer.events({
  'submit':function(event, template) {
  	event.preventDefault();

   	var id = Router.current().params._id;
   	var tel = $("input").eq(0).val();
   	var name = tel;
   	if (!tel){
   		card.players[id]=0;
      Session.set(SMC,card)
      Router.go("/matchcaddie")
   	}else{
      
        $("#addBtn").attr("disabled","true")
        $("#addBtn").html("请稍候...");
        Meteor.subscribe('userData', tel,function(){

          var user = Meteor.users.findOne({username:tel})
          if(user){
            if(user.profile.nick_name){
              name = user.profile.nick_name;
            }
            card.players[id]={name:name,tel:user.username,userId:user._id}
          }else{
            card.players[id]={name:name,tel:tel,userId:0}
          }
          $("#addBtn").removeAttr("disabled");
          $("#addBtn").html("添加球员");

          Session.set(SMC,card)
          Router.go("/matchcaddie")
      
        });

   		
   	}
   	
   	
		
  },
 

});

