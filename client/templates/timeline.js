
var curMatchShowNum = 0;
var userID;

function getMoreMatch(){
  var increment = 5;
  curMatchShowNum+=increment;
  $("#loadMore").attr("disabled","true")
  $("#loadMore").html("Loading...");
  Meteor.subscribe('userMatch', userID,curMatchShowNum,function(){
    $("#loadMore").removeAttr("disabled");
  
    if(matchData.find({userID:userID}).count() < curMatchShowNum){
      $("#loadMore").hide();
    }else{
      $("#loadMore").html("更多...");
    }
    
  });


}

function drawLine(type){
  var dd = matchData.find({},{ limit: 5} ).fetch();


    if(dd.length>0){

      var options = {
        series: {
            lines: { show: true ,fill:true,zero:false},
            points: { show: true },
        },
        xaxis:{ show: false },
        yaxis:{ show: false },
        grid:{show:true,borderColor:"#f5f5f5"}
      };


      var myData = [ { label: "", data: [ ] }]
      var len = dd.length;
      for (var i in dd){
        len--
        myData[0].data.push([len,dd[i].summary[type]]);
      }

      if($("#flot1_"+type).length>0){
        var p = $.plot($("#flot1_"+type), myData, options)

        $.each(p.getData()[0].data, function(i, el){
          var o = p.pointOffset({x: el[0], y: el[1]});
          $('<div class="data-point-label">' + el[1] + '</div>').css( {
            position: 'absolute',
            left: o.left -5,
            top: o.top + 5,
            display: 'none'
          }).appendTo(p.getPlaceholder()).fadeIn('slow');

        });
      }

        

    }

}

Template.timeline.created = function() {
  userID = Router.current().params._id;
  if(!userID){
    userID = Meteor.userId()
  }

}
Template.timeline.rendered = function() {
  getMoreMatch();


  drawLine("total")
  drawLine("push")
  drawLine("onRate")
  drawLine("sOnRate")

  // var myvalues = [72,75,76,80,75]

  //  $("#sparkline0").sparkline([72,75,76,80,75 ], {
  //   type: 'line',
  //   width: '100px',
  //   enableTagOptions: true,
  //   height: '60px'});
  //  $("#sparkline1").sparkline([75,85,76,80,78 ], {
  //   type: 'line',
  //   width: '100px',
  //   enableTagOptions: true,
  //   height: '60px'});

// var options = {
//     series: {
//         lines: { show: true ,fill:true,zero:false},
//         points: { show: true },
//     },
//     xaxis:{ show: false },
//     yaxis:{ show: false },
//     grid:{show:true,borderColor:"#f5f5f5"}
// };


// var myData = [ { label: "", data: [ [0, 72], [1, 75], [2, 76] , [3, 80] , [4, 75] ] }]

//    var p = $.plot($("#flot0"), myData, options)

//    $.each(p.getData()[0].data, function(i, el){
//       var o = p.pointOffset({x: el[0], y: el[1]});
//       $('<div class="data-point-label">' + el[1] + '</div>').css( {
//         position: 'absolute',
//         left: o.left -5,
//         top: o.top + 5,
//         display: 'none'
//       }).appendTo(p.getPlaceholder()).fadeIn('slow');

//     });


//    p = $.plot($("#flot1"), myData, options)

//    $.each(p.getData()[0].data, function(i, el){
//       var o = p.pointOffset({x: el[0], y: el[1]});
//       $('<div class="data-point-label">' + el[1] + '</div>').css( {
//         position: 'absolute',
//         left: o.left -5 ,
//         top: o.top + 5,
//         display: 'none'
//       }).appendTo(p.getPlaceholder()).fadeIn('slow');

//     });



}


Template.timeline.helpers({
  getMatch: function() {

    return matchData.find({userID:userID},{ sort: {createdAt: -1}})
  },

  getSummary:function(data){

  },
  isShowLine:function(){
    if(userID == Meteor.userId()){
      return true
    }
    return false
  },
  drawLine:function(type){

    drawLine(type)
    
  },
  canBack:function(){
    if(Router.current().params._type){
      return true;
    }

    return false;
  },
  getStatus:function(){
    var status = statData.findOne({userID:userID})
    if(status){
      return status;
    }
  }

 
})

Template.timeline.events({
   'click #loadMore': function(event, template) {
      event.preventDefault();
      if(!Meteor.userId()){
        Session.set("TargetUrl",window.location.pathname)
        Router.go("/sign-in")
        return;
      }
      getMoreMatch();

   },
   'click #verifyBtn':function(event, template){
      event.preventDefault();
      var id = $(event.currentTarget).attr("mid")

      var match = matchData.findOne(id);
      
      if (match){
        match.valid = 1;
        $(event.currentTarget).parent().html("处理中...")

        Meteor.call('updateMatch', match, function(error, result) {

          var ret = '比赛结果已确认.'
          if (error) {
            alert(error.reason);
          } else {
            Template.appBody.addNotification({
              action: '确定',
              title: ret,
              callback: function() {

              }
            });
          }
        });
      }

      

   },
   'click #delBtn':function(event, template){
      event.preventDefault();

      var id = $(event.currentTarget).attr("mid")

      var match = matchData.findOne(id);
      if (match){
        match.valid = 1;

        Meteor.call('delMatch', id, function(error, result) {

          var ret = '比赛结果已删除.'
          if (error) {
            alert(error.reason);
          } else {
            Template.appBody.addNotification({
              action: '确定',
              title: ret,
              callback: function() {

              }
            });
          }
        });
      }

   }
  

});