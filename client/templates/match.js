curPage=0;
totalPage=0;
animEndEventName = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
Template.match.rendered = function() {


  function changePage(cPageNum,nPageNum,pTran){

    var pages = $(".matchpage .section");

    var cPage = pages.eq(cPageNum);
      var nPage = pages.eq(nPageNum);

      // if(window["p_"+cPageNum+"_exit"]){
      //   window["p_"+cPageNum+"_exit"]();
      // }

    var endCurrPage = false;
    var endNextPage = false;
    nPage.addClass('activeSection' );

    // if(window["p_"+nPageNum+"_enter"]){
    //     window["p_"+nPageNum+"_enter"]();
    //   }


    //pages.eq(cPageNum).removeClass("activeSection")

      cPage.addClass( pTran.out ).on( animEndEventName, function() {
        
      cPage.off( animEndEventName );
      pages.eq(cPageNum).removeClass("activeSection")
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
      cPage.attr( 'class', cPage.data( 'originalClassList' ) );
      nPage.attr( 'class', nPage.data( 'originalClassList' ) + ' activeSection' );
      //pages.eq(nPageNum).addClass("activePage")
      //Utils.showPage(nPageNum)

      //isAnimating = false;
    }

  }

  window.pageDown=function(){

    
      if (curPage ==  totalPage-1) return;

      var pTransition={"out":"pt-page-moveToTop","in":"pt-page-moveFromBottom"}

      
      
      var nextPage = curPage+1;

      changePage(curPage,nextPage,pTransition)


      curPage=nextPage;
  }
  window.pageUp=function(){

    
      if (curPage==0) return;

      var pTransition={"out":"pt-page-moveToBottom","in":"pt-page-moveFromTop"}

      
      
      var nextPage = curPage-1;
      // var cPage = $(".page").eq(curPage);
      // var nPage = $(".page").eq(nextPage);
      // changePage(cPage,nPage,pTransition)
      changePage(curPage,nextPage,pTransition)


      curPage=nextPage;
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

  curPage=0;
  totalPage = $(".matchpage .section").length
    $(".matchpage .section").each(function(){
      $(this).data( 'originalClassList', $(this).attr( 'class' ) );
    })

  $(".matchpage .section").eq(curPage).addClass("activeSection");
  $(".matchpage .activeSection input").eq(0).focus()
 
  

}