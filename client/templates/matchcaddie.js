var SMC = "sMatchCard";

var card = {};

Template.matchcaddie.created = function() {

  // var card = Session.get(SMC);

  // if(!card){
  //   card={};
  //   Session.set(SMC,card);
  // }

  //Session.setDefault(SMC,{rule:0,players:[0,0,0,0]})

  if(Router.current().params._id){
    card = {rule:0,players:[0,0,0,0],finish:0}
    card = Session.set(SMC,card);
  }
  card = Session.get(SMC);


}

Template.matchcaddie.rendered = function() {
  card.rule=0;
}

Template.matchcaddie.helpers({

  getCourtName:function(){
    
    var name = "";
  
    if(Router.current().params._id){
      var court =  courtsData.findOne(Router.current().params._id);

      if (court){
        name = court.name;
        card.courtID = Router.current().params._id;
        card.courtName = court.name;
        card.city = court.city;
        Session.set(SMC,card);
      }
      

    } else{
      if (card && card.courtName){
         name = card.courtName;
      }
    }

    return name;
    
  },
  getPlayer:function(ind){

    var username = false;
    
    if (card && card.players&&card.players[ind]){
      username = card.players[ind].name;
    }


    return username;
  },
  isReady:function(num,l){
 
    var players=0;
    for (var i in card.players){
      if (card.players[i]){
        players++;
      }
    }

    if (l){
      if(players ==num ){
        return ""
      }else{
        return "disabled"
      }
    }else{
      if(players <num ){
        return "disabled"
      }else{
        return ""
      }
    }

    

   
  }
 
})

Template.matchcaddie.events({
   'click #start': function(event, template) {
      event.preventDefault();

      var records=[[],[],[],[]]

      var court = courtsData.findOne(card.courtID)

      var p=[];
      for (var i in card.players){
        if(card.players[i]){
          p.push(card.players[i])
        }
      }

      for (var j=p.length;j<4;j++){
        p.push(0);
      }

      card.players = p;
      
      for (var i in court.pars){
        for (var j=0;j<4;j++){
          records[j].push({"par":court.pars[i],"total":0,"put":0,"on":false})
        }
      }

      card.records = records;
      Session.set(SMC,card);
      
      console.log(card)
      
      Router.go("/matchcard")

   },
   'click #rule':function(event,template){
      event.preventDefault();
    
      var value = parseInt($(event.currentTarget).val());
      if(value == card.rule){
        $(event.currentTarget).removeClass("btn-success");
        card.rule = 0;
      }else{
        $(event.currentTarget).addClass("btn-success");
        $(event.currentTarget).siblings().removeClass("btn-success");
        card.rule = value;
      }
      
   },
   'click #player':function(event,template){
      event.preventDefault();
      
      var id = $(event.currentTarget).val();
      // if(id==""){
      //   id = $(event.target).parent().val();
      // }
      id = parseInt(id)
  
      if (id >=0){
        Router.go("/matchplayer/"+id)
        return
      }
      
   },


  });