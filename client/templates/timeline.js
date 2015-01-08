
var curMatchShowNum = 0;
var userID;

function getMoreMatch(){
  var increment = 2;
  curMatchShowNum+=increment;
  $("#loadMore").attr("disabled","true")
  $("#loadMore").html("Loading...");
  Meteor.subscribe('userMatch', userID,curMatchShowNum,function(){
    $("#loadMore").removeAttr("disabled");
    if(matchData.find().count() < curMatchShowNum){
      $("#loadMore").hide();
    }else{
      $("#loadMore").html("更多...");
    }
    
  });


}

Template.timeline.created = function() {
  moment.locale('zh-cn');
  userID = Router.current().params._id;
  if(!userID){
    userID = Meteor.userId()
  }

}
Template.timeline.rendered = function() {
  getMoreMatch();

}


Template.timeline.helpers({
  getMatch: function() {

    return matchData.find()
  },
  getTime:function(t){
    return moment(t).fromNow();

  },
  getSummary:function(data){

  }

 
})

Template.timeline.events({
   'click #loadMore': function(event, template) {
      event.preventDefault();
      getMoreMatch();

   },
  

  });