var order = 0;
Template.rank.created = function() {
  order = 0;
}
Template.rank.rendered = function() {
 

}

Template.rank.helpers({
 getList:function(){
    order = 0;
    var data = this.fetch();  
    for (var i=0;i<data.length;i++){
      data[i].ind=i+1;
    }
    
    return data;
 },
 getOrder:function(){
  order++;
   return order
 },
 getItem:function(obj){
    var ind=['aTotal','aPush','aOn','aSon'];
    var i = parseInt(Router.current().params._type)
    var ret = obj[ind[i]];
    if (i==2 || i==3){
      ret+="%"
    }
    return ret
 },
 getMonth:function(){
  return moment().format("M")+"月排行榜";
 },
 isActive:function(o){
  var i = parseInt(Router.current().params._type)
  if(i==o){
    return "ui-btn-active"
  }
  
 }

 
})

Template.rank.events({
  'click #item':function(event, template) {
    event.preventDefault(); 
  
    var uid = $(event.currentTarget).attr("uid");
    Router.go("/userinfo/"+uid);


  }
 

});