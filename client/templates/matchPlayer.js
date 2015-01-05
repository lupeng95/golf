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
   	}else{
   		var user = Meteor.users.findOne({username:tel})
   		if(user){
	   		if(user.profile.nickname){
	   			name = user.profile.nickname;
	   		}
	   		card.players[id]={name:name,tel:user.username,userId:user._id}
   		}else{
   			card.players[id]={name:name,tel:tel,userId:0}
   		}
   		
   	}
   	
   	Session.set(SMC,card)
   	Router.go("/matchcaddie")
		
  },
 

});

