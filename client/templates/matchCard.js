var SMC = "sMatchCard";
var SHOLE = "sStartHole"
var card;

function formatInttoStr(i){
  if (i>=0){
    return "+"+i

  }
  return ""+i;
}

function rule1(){

  var num = 0;
  var p = [];
  for (var i in card.players){
    if(card.players[i]){
      num++;
      p.push(0);
    }
  }

  var record1 =  card.records[0];
    

    for (var i in record1){
      var rr=[];
      for (var j=0;j<num;j++){
        p[j]+=card.records[j][i].total;
        rr.push(card.records[j][i].total);
      }
      var min=Math.min.apply(null, rr)
      if (min >0){
        for (var k=0;k<num ;k++){
          if (min == rr[k]){
            $(".h_"+i+" td").eq(k+1).addClass("win")
          }
        }
      }
      
    } 

    var minRet = Math.min.apply(null, p);
    for (var i=0 ; i<num;i++){
      $("#r_"+i).html(p[i])
      if (minRet >0){
        if( minRet == p[i]){
          $("#r_"+i).addClass("win")
        }else{
          $("#r_"+i).append("<sup>+"+(p[i]-minRet)+"</sup>")
        }
      }
      
    }
}

function rule2(){

  var num = 0;
  var p = [];
  for (var i in card.players){
    if(card.players[i]){
      num++;
      p.push(0);
    }
  }
  var record1 =  card.records[0];


    for (var i in record1){
      var rr=[];
      for (var j=0;j<num;j++){
        rr.push(card.records[j][i].total);
      }
      var min=Math.min.apply(null, rr)
      if (min >0){
        for (var k=0;k<num ;k++){
          if (min == rr[k]){
            p[k]++;
            $(".h_"+i+" td").eq(k+1).addClass("win")
          }
        }
      }
      
    } 

    var maxRet = Math.max.apply(null, p);
    for (var i=0 ; i<num;i++){
      $("#r_"+i).html(p[i])
      if (maxRet >0){
        if( maxRet == p[i]){
          $("#r_"+i).addClass("win")
        }
        // else{
        //   $("#r_"+i).append("<sup>+"+(maxRet-p[i])+"</sup>")
        // }
      }
      
    }
}

function rule3(){  //斗地主

  var start = Session.get(SHOLE);
  if (start==-1){
    start = 0;
  }

  var records = [];
  records[0] = _.rest(card.records[0],start);
  records[0] = records[0].concat(_.first(card.records[0],start));

  records[1] = _.rest(card.records[1],start);
  records[1] = records[1].concat(_.first(card.records[1],start));

  records[2] = _.rest(card.records[2],start);
  records[2] = records[2].concat(_.first(card.records[2],start));

  records[3] = _.rest(card.records[3],start);
  records[3] = records[3].concat(_.first(card.records[3],start));

  var len = records[0].length;
  

  //var records = card.records;

  function getRealOrder(ord){
    var dd = parseInt(ord) + start;
    if (dd >= len){
      dd=dd-len;
    }

    return dd
  }

  function compare(p1,p2,hole){
    for(var i=hole-1;i>=0;i--){
      var ret = records[p1][i].total - records[p2][i].total;
      if (ret!=0){
        return ret
      }
    }

    return 1;
  }
  function getTeam(hole){
    hole = parseInt(hole)
    if(hole==0){
      return [0,1,2]
    }else{
      hole--;
      var ret=[]
      var rr = []
      for (var j=0;j<3;j++){
          rr.push(records[j][hole].total);
      }

      var max=Math.max.apply(null, rr)
      var max_p=[]

      for (var j=0;j<3;j++){
          if(records[j][hole].total==max){
            max_p.push(j);
          }        
      }

      if(max_p.length==3){  //3 players have the same record. :0
        return getTeam(hole);
      }else if(max_p.length==2){
        if (compare(max_p[0],max_p[1],hole)>0){
          max_p=[max_p[0]]
        }else{
          max_p=[max_p[1]]
        }
      }


      var min=Math.min.apply(null, rr)
      var min_p=[]

      for (var j=0;j<3;j++){
          if(records[j][hole].total==min){
            min_p.push(j);
          }        
      }

      if(min_p.length==2){
        if (compare(min_p[0],min_p[1],hole)>0){
          min_p=[min_p[1]]
        }else{
          min_p=[min_p[0]]
        }
      }

      ret=[max_p[0],min_p[0]]

      for(var i=0;i<3;i++){
        if(ret[0]!=i && ret[1]!=i){
          ret.push(i)
          break;
        }
      }

      return ret
    }
  }

  function drawTeam(hole,team){

    var h = getRealOrder(hole)
    $(".h_"+h+" td").eq(team[0]+1).addClass("win");
    $(".h_"+h+" td").eq(team[1]+1).addClass("win");

  }


  var record1 =  records[0];
  var p = [0,0,0]

  for (var i in record1){
    var rr = []
    for (var j=0;j<3;j++){
        rr.push(records[j][i].total);
    }

    var team = getTeam(i);
    drawTeam(i,team)
    var max=Math.max.apply(null, rr)

    if(max==0){
      break;
    }
    var p0 = records[team[0]][i].total
    var p1 = records[team[1]][i].total
    var p2 = records[team[2]][i].total
    if((p0+p1)/2>p2){
      
      p[team[0]]--;
      p[team[1]]--;
      p[team[2]]+=2;

    }

    if((p0+p1)/2<p2){
      p[team[0]]++;
      p[team[1]]++;
      p[team[2]]-=2;      

    }

    $(".h_"+getRealOrder(i)+" td").eq(team[0]+1).append("("+formatInttoStr(p[team[0]])+")")
    $(".h_"+getRealOrder(i)+" td").eq(team[1]+1).append("("+formatInttoStr(p[team[1]])+")")
    $(".h_"+getRealOrder(i)+" td").eq(team[2]+1).append("("+formatInttoStr(p[team[2]])+")")



  }


  var maxRet = Math.max.apply(null, p);
    for (var i=0 ; i<3;i++){
      $("#r_"+i).html(p[i])
      if (maxRet >0){
        if( maxRet == p[i]){
          $("#r_"+i).addClass("win")
        }
      //   else{
      //     $("#r_"+i).append("<sup>+"+(maxRet-p[i])+"</sup>")
      //   }
      }
      
    }



}


function rule4(){  //拉斯

  var start = Session.get(SHOLE);
  if (start==-1){
    start = 0;
  }
  
  var records = [];
  records[0] = _.rest(card.records[0],start);
  records[0]=records[0].concat(_.first(card.records[0],start));

  records[1] = _.rest(card.records[1],start);
  records[1] = records[1].concat(_.first(card.records[1],start));

  records[2] = _.rest(card.records[2],start);
  records[2] = records[2].concat(_.first(card.records[2],start));

  records[3] = _.rest(card.records[3],start);
  records[3] = records[3].concat(_.first(card.records[3],start));

  var len = records[0].length;
  

  //var records = card.records;

  function getRealOrder(ord){
    
    var dd = parseInt(ord) + start;
    if (dd >= len){
      dd=dd-len;
    }

    return dd
  }




  function compare(p1,p2,hole){
    for(var i=hole-1;i>=0;i--){
      var ret = records[p1][i].total - records[p2][i].total;
      if (ret!=0){
        return ret
      }
    }

    return 1;
  }
  function getTeam(hole){
    if(hole==0){
      return [0,2,1,3]
    }else{
      hole--;
      var ret=[]
      var rr = []
      for (var j=0;j<4;j++){
          rr.push(records[j][hole].total);
      }

      var max=Math.max.apply(null, rr)
      var max_p=[]

      for (var j=0;j<4;j++){
          if(records[j][hole].total==max){
            max_p.push(j);
          }        
      }

      if(max_p.length==4){  //4 players have the same record. :0
        return getTeam(hole);
      }else if(max_p.length==3){
        var max_tmp;
        if(compare(max_p[0],max_p[1],hole)>0){  //compare the first two
          max_tmp=max_p[0]
        }else{
          max_tmp=max_p[1]
        }

        if(compare(max_tmp,max_p[2],hole)>0){
          max_p=[max_tmp]
        }else{
          max_p=[max_p[2]]
        }
      }else if(max_p.length==2){
        if (compare(max_p[0],max_p[1],hole)>0){
          max_p=[max_p[0]]
        }else{
          max_p=[max_p[1]]
        }
      }


      var min=Math.min.apply(null, rr)
      var min_p=[]

      for (var j=0;j<4;j++){
          if(records[j][hole].total==min){
            min_p.push(j);
          }        
      }

      if(min_p.length==3){
        var min_tmp;
        if (compare(min_p[0],min_p[1],hole)>0){
          min_tmp=min_p[1]
        }else{
          min_tmp=min_p[0]
        }

        if (compare(min_tmp,min_p[2],hole)>0){
          min_p=[min_p[2]]
        }else{
          min_p=[min_tmp]
        }

      }else if(min_p.length==2){
        if (compare(min_p[0],min_p[1],hole)>0){
          min_p=[min_p[1]]
        }else{
          min_p=[min_p[0]]
        }
      }

      ret=[max_p[0],min_p[0]]

      for(var i=0;i<4;i++){
        if(ret[0]!=i && ret[1]!=i){
          ret.push(i)
          
        }
      }

      return ret
    }
  }

  function drawTeam(hole,team){
    
    var h = getRealOrder(hole)
    $(".h_"+h+" td").eq(team[0]+1).addClass("win");
    $(".h_"+h+" td").eq(team[1]+1).addClass("win");

  }


  var record1 =  records[0];
  var p = [0,0,0,0]
  var bonus=0;

  for (var i in record1){
    var rr = []
    for (var j=0;j<4;j++){
        rr.push(records[j][i].total);
    }

    var team = getTeam(i);
    drawTeam(i,team)
    var max=Math.max.apply(null, rr)

    if(max==0){
      break;
    }
    var p0 = records[team[0]][i].total
    var p1 = records[team[1]][i].total
    var p2 = records[team[2]][i].total
    var p3 = records[team[3]][i].total

    var par = records[team[0]][i].par;

    if((p0+p1)>(p2+p3)){
      
      p[team[0]]--;
      p[team[1]]--;
      p[team[2]]++;
      p[team[3]]++;

      
      if((p2<par || p3<par)){  //birds
        p[team[0]]--;
        p[team[1]]--;
        p[team[2]]++;
        p[team[3]]++;
        if(bonus>0){
           bonus--;
          p[team[0]]--;
          p[team[1]]--;
          p[team[2]]++;
          p[team[3]]++;
        }
        if(bonus>0){
           bonus--;
          p[team[0]]--;
          p[team[1]]--;
          p[team[2]]++;
          p[team[3]]++;
        }
        
        

      }else{
        if(bonus>0 && (p2==par || p3==par)){
          bonus--;
          p[team[0]]--;
          p[team[1]]--;
          p[team[2]]++;
          p[team[3]]++;

        }
      }


    }

    if((p0+p1)<(p2+p3)){
      
      p[team[0]]++;
      p[team[1]]++;
      p[team[2]]--;      
      p[team[3]]--;   

      if((p0<par || p1<par)){  //birds
        p[team[0]]++;
        p[team[1]]++;
        p[team[2]]--;      
        p[team[3]]--;  
        if(bonus>0){
          bonus--;
          p[team[0]]++;
          p[team[1]]++;
          p[team[2]]--;
          p[team[3]]--;
        }
        if(bonus>0){
          bonus--;
          p[team[0]]++;
          p[team[1]]++;
          p[team[2]]--;
          p[team[3]]--;
        }
        
        

      }else{
        if(bonus>0 && (p0==par || p1==par)){
          bonus--;
          p[team[0]]++;
          p[team[1]]++;
          p[team[2]]--;      
          p[team[3]]--;  

        }
      }

    }

    if((p0+p1)==(p2+p3)){  //rou
      bonus++;
      $(".h_"+getRealOrder(i)+" td").eq(0).addClass("bonus");
    }

    $(".h_"+getRealOrder(i)+" td").eq(0).append("<sup>"+bonus+"</sup>")
    $(".h_"+getRealOrder(i)+" td").eq(team[0]+1).append("("+formatInttoStr(p[team[0]])+")")
    $(".h_"+getRealOrder(i)+" td").eq(team[1]+1).append("("+formatInttoStr(p[team[1]])+")")
    $(".h_"+getRealOrder(i)+" td").eq(team[2]+1).append("("+formatInttoStr(p[team[2]])+")")
    $(".h_"+getRealOrder(i)+" td").eq(team[3]+1).append("("+formatInttoStr(p[team[3]])+")")



  }


  var maxRet = Math.max.apply(null, p);
  for (var i=0 ; i<4;i++){
    $("#r_"+i).html(p[i])
    if (maxRet >0){
      if( maxRet == p[i]){
        $("#r_"+i).addClass("win")
      }
      // else{
      //   $("#r_"+i).append("<sup>+"+(maxRet-p[i])+"</sup>")
      // }
    }
    
  }

}

Template.matchcard.created = function() {
  card = Session.get(SMC);

}
Template.matchcard.rendered = function() {
  //$(".matchpage .card  input").eq(0).focus()

  var html = "";

  var record1 =  card.records[0];
  var ret=[0,0,0,0]
  for (var i in record1){

    var p=[]
    for (var j=0;j<4; j++) {
      var player = card.records[j][i]
      ret[j]+=player.total;
      p[j]="";
      if (player.total){
        // var r="off";
        // if (player["on"]){
        //   r="on";
        // }
        p[j] = player.total
        //+"<sup>"+player["put"]+"</sup><sub>"+r+"</sub>"
      }
    }
    var ind=parseInt(i)+1;

    html+='<tr id="hole" ind="'+(ind)+'" class="h_'+i+'"> \
            <td style="width:16%;padding:0;height:40px" ind="'+ind+'">'+ind+'<span class="smallFont">['+card.records[0][i].par+']</span></td> \
            <td style="width:21%;padding:0" ind="'+ind+'">'+p[0]+'</td> \
            <td style="width:21%;padding:0" ind="'+ind+'">'+p[1]+'</td> \
            <td style="width:21%;padding:0" ind="'+ind+'">'+p[2]+'</td> \
            <td style="width:21%;padding:0" ind="'+ind+'">'+p[3]+'</td> \
            </tr>'
  }
    
  html+='<tr  class="sumline"> \
            <td style="width:16%;padding:0;height:40px" >总杆</td> \
            <td style="width:21%;padding:0" >'+ret[0]+'</td> \
            <td style="width:21%;padding:0" >'+ret[1]+'</td> \
            <td style="width:21%;padding:0" >'+ret[2]+'</td> \
            <td style="width:21%;padding:0" >'+ret[3]+'</td> \
            </tr>'

  $("#recordTable").append(html)
  switch(card.rule){
    case 0:
    case 1:
      rule1();
      break;
    case 2:
      rule2();
      break;
    case 3:
      rule3()
      break;
    case 4:
      rule4()
      break;
    default:
      break;
  }


}

Template.matchcard.helpers({
 getRule:function(){
   var rules=["总杆数","比杆赛","比洞赛","斗地主","拉斯"];
   return rules[card.rule];
 },
 getHoles:function(){
  
  // var court =  courtsData.findOne(card.courtID)
  // if(court){
  //   var holes = court.pars
    
  //   var ret=[]
  //   for (var i in holes){
  //     ret.push({ind:parseInt(i)+1,par:holes[i]})
  //   }
    
  //   return ret;
  // }
  
 },
 getMatchResult:function(){
    
 },
 getPlayers:function(){
    var players=[];
    
    for (var i in card.players){
      if(card.players[i]){
        if (card.players[i].name.length >3){
          players.push(card.players[i].name.substring(0,3)+"...")
        }else{
          players.push(card.players[i].name)
        }
        
      }else{
        players.push("")
      }
      
    }

    return players;
 },
 getRecord:function(playerID,holeID){
    var record = card.records[playerID][holeID-1];
    if(record["total"]){
      var r="off";
      if (record["on"]){
        r="on";
      }
      return record["total"]+"<sup>"+record["put"]+"</sup><sub>"+r+"</sub>"
    }
    return ""


 },
 
})

Template.matchcard.events({
  'click #hole':function(event, template) {
    event.preventDefault(); 

    if(card.finish){
      return;
    }

    var ind = $(event.currentTarget).attr("ind");
    


    Router.go("/matchhole/"+ind)

  },
  'click #btn-ok':function(event, template) {
    // if(card.finish){
    //   return;
    // }
     $("#msg").html("提交后将无法修改成绩。确认提交?")
     $('#myModal').modal({show:true})  
     return;

    

  },
  'click #confirmBtn':function(event, template){
    card.finish = 1;
    $('#myModal').modal('toggle')
    $("#btn-ok").html("上传中");

    for(var i in card.players){
      if(card.players[i]){
        var p={};
        p.userID = card.players[i].userId;
        p.name = card.players[i].name;
        p.tel = card.players[i].tel;
        p.courtID = card.courtID;
        p.courtName = card.courtName;
        p.city = card.city;
        
        p.record = card.records[i];
        //p.createdAt = new Date();

        Meteor.call('addMatch', p, function(error, result) {
          var ret = '比赛结果已储存.'
          if (error) {
            alert(error.reason);
          } else {
            amplify.store("card",false); // clear local storage
            Template.appBody.addNotification({
              action: '确定',
              title: ret,
              callback: function() {

              }
            });
          }
        });

        // var _id = matchData.insert(p);
        // console.log(_id)
      }
        
    }

    $("#btn-ok").html("已结束");
    Session.set(SMC,card);
  }

});