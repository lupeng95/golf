var order = 0;
Template.rank.created = function() {
 
}
Template.rank.rendered = function() {
 

}

Template.rank.helpers({
 getList:function(){
    order = 0;
    return this;
 },
 getOrder:function(){
  order++;
   return order
 },
 getItem:function(obj){
    var ind=['aTotal','aPush','aOn','aSon'];
    var i = parseInt(Router.current().params._type)
    return obj[ind[i]]
 },
 getMonth:function(){
  return moment().format("M")+"月";
 },
 isActive:function(o){
  var i = parseInt(Router.current().params._type)
  if(i==o){
    return "ui-btn-active"
  }
  
 }

 
})

Template.rank.events({
  'click #tel':function(event, template) {
    //event.preventDefault(); 


  }
 

});