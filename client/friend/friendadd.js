
var ANIMATION_DURATION = 300;


Template.friendadd.rendered = function() {

  $(document).ready(function() {
  	Meteor.setTimeout(function() {
    	$("input").eq(0).focus()
  	}, ANIMATION_DURATION);
	
  })
}

Template.friendadd.events({
  'submit':function(event, template) {
  	event.preventDefault();

   	var tel = $("input").eq(0).val();

   	if (!tel){

   	}else{
      
        $("#addBtn").attr("disabled","true")
        $("#addBtn").html("请稍候...");
        Meteor.subscribe('userData', tel,function(){

          var user = Meteor.users.findOne({username:tel})
          if(user){
            Router.go("/userinfo/"+user._id)
          }else{
            
          }
          $("#addBtn").removeAttr("disabled");
          $("#addBtn").html("查询");
      
        });

   		
   	}
   	
   	
		
  },
 

});

