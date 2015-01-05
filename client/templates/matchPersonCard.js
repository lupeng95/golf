var CITY = "mSelectedCity";


Template.matchperson2.created = function() {

}
Template.matchperson2.rendered = function() {
  //$(".matchpage .card  input").eq(0).focus()
}

Template.matchperson2.helpers({
 getHoles:function(){
  
  var court =  courtsData.findOne(Router.current().params._id)
  if(court){
    var holes = court.pars
    
    var ret=[]
    for (var i in holes){
      ret.push({ind:parseInt(i)+1,par:holes[i]})
    }
    
    return ret;
  }
  
 },
 
})

Template.matchperson2.events({
  'click input[type=checkbox]':function(event, template) {
    var ind = $('input').index(event.target) + 1;
    if(ind < $('input').length){
      $('input').eq(ind).focus()
    }
  },
  'keyup input[type=tel]':function(event, template) {
    var v = $(event.target).val();
    if(v.length ==2){
      var ind = $('input[type=tel]').index(event.target) + 1;
      if(ind < $('input[type=tel]').length){
        $('input[type=tel]').eq(ind).focus()
      }
    }
  }

});