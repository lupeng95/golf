

var court;
var record=[];





Template.matchview.created = function() {

}
Template.matchview.rendered = function() {
  //$(".matchpage .card  input").eq(0).focus()
}

Template.matchview.helpers({
 getRecord:function(){
  
  match =  matchData.findOne(Router.current().params._id)
  
  if(match){
    
    var holes = match.record
    
    var ret=[]
    for (var i in holes){
      ret.push({ind:parseInt(i)+1,par:holes[i].par,total:holes[i].total,put:holes[i].put,on:holes[i].on})
    }
    
    return ret;
  }
  
 },
 getTotal:function(){
   match =  matchData.findOne(Router.current().params._id)
  
  if(match){
    
    var holes = match.record
    
    var t=0;
    var p=0;
    var par=0;
    for (var i in holes){
      par+=holes[i].par;
      t +=holes[i].total;
      p +=  holes[i].put;
    }
    
    return {par:par,total:t,put:p};
  }

 }
 
})

Template.matchview.events({
  

});