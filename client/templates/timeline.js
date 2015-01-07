
var curMatchShowNum = 0;

function getMoreMatch(){
  var increment = 2;
  curMatchShowNum+=increment;
  $("#loadMore").attr("disabled","true")
  $("#loadMore").html("Loading...");
  Meteor.subscribe('userMatch', Router.current().params._id,curMatchShowNum,function(){
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