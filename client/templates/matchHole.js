var SMC = "sMatchCard";
//var RC ="sRecordCard";
var card;
var ANIMATION_DURATION = 300;

var curPage=0;
var totalPage=0;
var animEndEventName = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';


function setPageBtn(page){
    if(curPage==0){
      $(page+" button #pre").html("第"+(parseInt(totalPage))+"洞")
    }else{
      $(page+" button #pre").html("第"+(parseInt(curPage))+"洞")
    }
    
    if(curPage==totalPage-1){
      $(page+" button #next").html("第"+(1)+"洞")
    }else{
      $(page+" button #next").html("第"+(parseInt(curPage)+2)+"洞")
    }

}
function initPage(cPage,hole){
  cPage.find("#par").html(card.records[0][hole].par)
  var vals = cPage.find("input[type=tel]")
  for(var i=0;i<vals.length; i++){
      var item = $(vals[i]);
      item.val(card.records[item.attr("player")][hole][item.attr("name")]);
    }

  vals = cPage.find("input[type=checkbox]");
  for (var i=0;i<vals.length; i++){
    var item = $(vals[i])
    vals[i].checked = card.records[item.attr("player")][hole].on
  }
}
function storeCurPage(){
  var cPage = $(".matchpage .activeSection")

   var vals = cPage.find("input[type=tel]")
    
    for(var i=0;i<vals.length; i++){
      var item = $(vals[i]);
      card.records[item.attr("player")][curPage][item.attr("name")] =parseInt(item.val())
    }

    vals = cPage.find("input[type=checkbox]");
    for (var i=0;i<vals.length; i++){
      var item = $(vals[i])
      card.records[item.attr("player")][curPage].on =vals[i].checked
    }


}

Template.matchhole.created = function() {
  curPage = Router.current().params._id-1;
  card = Session.get(SMC);
  totalPage = card.records[0].length;
  // Session.set(RC+"0",curPage)
  // Session.set(RC+"1",curPage)


}

Template.matchhole.destroyed = function(){
  storeCurPage()
  Session.set(SMC,card);
}

Template.matchhole.rendered = function() {


  function changePage(pTran){

    //var pages = $(".matchpage .section");

    // var cPage = pages.eq(cPageNum);
    // var nPage = pages.eq(nPageNum);
    

    var cPage = $(".matchpage .activeSection")
    var nPage = $(".matchpage .inactiveSection")

   

    setPageBtn(".inactiveSection");

    // var ind = nPage.attr("ind");
    // var tt = RC+ind;

    initPage(nPage,curPage);
    //Session.set(tt,curPage)
    

      // if(window["p_"+cPageNum+"_exit"]){
      //   window["p_"+cPageNum+"_exit"]();
      // }

    var endCurrPage = false;
    var endNextPage = false;
    nPage.addClass('activeSection' ).removeClass("inactiveSection");

    // if(window["p_"+nPageNum+"_enter"]){
    //     window["p_"+nPageNum+"_enter"]();
    //   }


    //pages.eq(cPageNum).removeClass("activeSection")

      cPage.addClass( pTran.out ).on( animEndEventName, function() {
        
      cPage.off( animEndEventName );
      cPage.removeClass("activeSection").addClass("inactiveSection")
      endCurrPage = true;
      if( endNextPage ) {
        onEndAnimation();
      }


    } );
      
    nPage.addClass(  pTran.in ).on( animEndEventName, function() {
      nPage.off( animEndEventName );
      endNextPage = true;
      if( endCurrPage ) {
        onEndAnimation();
      }

    } );

    function onEndAnimation(){
      
      endCurrPage = false;
      endNextPage = false;
      cPage.attr( 'class', cPage.data( 'originalClassList' ) + ' inactiveSection');
      nPage.attr( 'class', nPage.data( 'originalClassList' ) + ' activeSection' );
      //pages.eq(nPageNum).addClass("activePage")
      //Utils.showPage(nPageNum)

      //isAnimating = false;
      $(".title-page").html("第"+(parseInt(curPage)+1)+"洞")
      $(".matchpage .activeSection input").eq(0).focus()
      

    }

  }

  window.pageRight=function(){

      storeCurPage();
      if (curPage ==  totalPage-1) {
        curPage = 0;

      }else{
        curPage++;
      }
      

      
      var pTransition={"out":"pt-page-moveToLeft","in":"pt-page-moveFromRight"}

      
      
      // var nextPage = curPage+1;

      changePage(pTransition)


      //curPage=nextPage;
  }
  window.pageLeft=function(){

    
      storeCurPage();
      if (curPage==0) {
          curPage = totalPage-1;
      }else{
          curPage--;
      }

      var pTransition={"out":"pt-page-moveToRight","in":"pt-page-moveFromLeft"}

      
      
      //var nextPage = curPage-1;

      changePage(pTransition)


      //curPage=nextPage;
  }
  $(".matchpage .section").swipe( {
        //Generic swipe handler for all directions
        swipeDown:function(event, direction, distance, duration, fingerCount) {
          
          window.pageUp()
          //$(this).text("You swiped " + direction + " " + ++count + " times " );  
        },
        swipeUp:function(event, direction, distance, duration, fingerCount) {
          window.pageDown()
          //$(this).text("You swiped " + direction + " " + ++count + " times " );  
        },

  });

  // curPage=0;
  // totalPage = $(".matchpage .section").length
    $(".matchpage .section").each(function(){
      $(this).data( 'originalClassList', $(this).attr( 'class' ) );
    })

  $(".matchpage .section").eq(0).addClass("activeSection");
  $(".matchpage .section").eq(1).addClass("inactiveSection");
  

  $(document).ready(function() {
    Meteor.setTimeout(function() {
      $(".matchpage .activeSection input").eq(0).focus()
    }, ANIMATION_DURATION);

    setPageBtn(".activeSection");
  
  })
 
  

}

Template.matchhole.helpers({
   getHoleName:function(){
     var holeName= "第"+(curPage+1)+"洞";
     return holeName;
   },

   // getPlayers:function(){
   //    var players = [];
   //    for (var i in card.players){
   //      if (card.players[i]){
   //        var p = {ind:i,hole:curPage,name:card.players[i].name,record:card.records[i][curPage]}
   //        players.push(p)
   //      }
   //    }
   //    //console.log(players)
   //    return players;
   // },
   getHoleRecord0:function(){

      //var hole = Session.get(RC+"0");
      var hole = curPage;
      
      var players = [];
      for (var i in card.players){
        if (card.players[i]){
          var p = {ind:i,hole:hole,name:card.players[i].name,record:card.records[i][hole]}
          players.push(p)
        }
      }

      return players;

   },
   getHoleRecord1:function(){

      //var hole = Session.get(RC+"1");
      var hole = curPage;
      
      var players = [];
      for (var i in card.players){
        if (card.players[i]){
          var p = {ind:i,hole:hole,name:card.players[i].name,record:card.records[i][hole]}
          players.push(p)
        }
      }
      
      return players;

   },
   getPlayerName:function(name){
      return name.substring(0,4);
   }

})

Template.matchhole.events({
  'focus input[type=tel]':function(event, template) {
    event.preventDefault(); 
    $(event.target).val("")

  },
  'blur input[type=tel]':function(event, template) {
    event.preventDefault(); 
    var val = $(event.target).val();
    var player = $(event.target).attr("player")
    if(val){
      card.records[player][curPage][$(event.target).attr("name")]=parseInt(val);
    }else{
      

      $(event.target).val(card.records[player][curPage][$(event.target).attr("name")])
    }
  },
  'keyup input[type=tel]':function(event, template) {
    var v = $(event.target).val();
    if(v.length ==2){
      var ind = $('.activeSection input[type=tel]').index(event.target) + 1;
      if(ind < $('.activeSection input[type=tel]').length){
        $('.activeSection input[type=tel]').eq(ind).focus()
      }
    }
  },
  'click input[type=checkbox]':function(event, template) {
    var ind = $('.activeSection input').index(event.target) + 1;
    if(ind < $('.activeSection input').length){
      $('.activeSection input').eq(ind).focus()
    }
  },
  'click #preBtn':function(event, template) {
    window.pageLeft()
  },
  'click #nextBtn':function(event, template) {
    window.pageRight()
  },
  'click #btn-ok':function(event, template) {
    Router.go("/matchcard")
  }

});

