
var curMatchShowNum = 0;
var userID;

var sDLI = "DRAWLINEINDEX";
var loading = true

function getMoreMatch(){
  var increment = 30;
  curMatchShowNum+=increment;
  Meteor.subscribe('userMatch', userID,curMatchShowNum,function(){

    $(".spinner-container").hide()
    $("#picTable").show()
    loading = false;
    //drawLine();
    

  });

}

function getMatchNum(){
   var ind = Session.get(sDLI);
    var num = 10;
    switch(ind){
      case 0:
        num = 4;
        break;
      case 1:
        num = 6;
        break;
      case 2:
        num = 7;
        break;
    }

    return num
}

function drawLine(type){
   var num = getMatchNum();

    var dd = matchData.find({},{ limit: num} ).fetch();

    if(dd.length>0 && $("#flot_"+type).length>0){
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
      //for(var i=dd.length-1;i>=0;i--){
      var len = dd.length;
      for (var i in dd){
        len--
        myData[0].data.push([len,dd[i].summary[type]]);
      }


      var p = $.plot($("#flot_"+type), myData, options)

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



Template.mystatus.created = function() {
  moment.locale('zh-cn');
  userID = Meteor.userId()
  loading = true
  Session.set(sDLI,0)

}
Template.mystatus.rendered = function() {
  getMoreMatch();
  console.log($("#flot_total").width())
  drawLine("total")
  drawLine("push")
  drawLine("onRate")
  drawLine("sOnRate")

}


Template.mystatus.helpers({
 
  getTime:function(t){
    return moment(t).fromNow();

  },
  startTime:function(){

   var num = getMatchNum();

    var dd = matchData.find({},{ limit: num} ).fetch();
    if(dd.length>0){
      
      return moment(dd[dd.length-1].createdAt).format("MM-DD-YY")
    }
    return ""

  },
  endTime:function(){

   var num = getMatchNum();

    var dd = matchData.find({},{ limit: num} ).fetch();
    if(dd.length>0){
      return moment(dd[0].createdAt).format("MM-DD-YY")
    }
    return ""

  },
  drawLine:function(type){

      drawLine(type)
   
    
  },

 
})






Template.mystatus.events({
   'click #btn10': function(event, template) {
      event.preventDefault();
      if (loading) return
      var i = Session.get(sDLI);
      var cur = 0;
      if (i == cur){
        return;
      }
      $(".ui-navbar li").eq(i).find("a").eq(0).removeClass("ui-btn-active");
      Session.set(sDLI,cur);
      $(".ui-navbar li").eq(cur).find("a").eq(0).addClass("ui-btn-active");
      

   },
   'click #btn20': function(event, template) {
      event.preventDefault();
      if (loading) return
      var i = Session.get(sDLI);
      var cur = 1;
      if (i == cur){
        return;
      }
      $(".ui-navbar li").eq(i).find("a").eq(0).removeClass("ui-btn-active");
      Session.set(sDLI,cur);
      $(".ui-navbar li").eq(cur).find("a").eq(0).addClass("ui-btn-active");
      

   },
   'click #btn30': function(event, template) {
      event.preventDefault();
      if (loading) return
      var i = Session.get(sDLI);
      var cur = 2;
      if (i == cur){
        return;
      }
      $(".ui-navbar li").eq(i).find("a").eq(0).removeClass("ui-btn-active");
      Session.set(sDLI,cur);
      $(".ui-navbar li").eq(cur).find("a").eq(0).addClass("ui-btn-active");
      

   },


  

});