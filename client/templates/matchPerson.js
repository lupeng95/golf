var CITY = "mSelectedCity";

Template.matchperson1.created = function() {

  Session.set(CITY,"北京");


}
Template.matchperson1.rendered = function() {

}

Template.matchperson1.helpers({
  courtListByCity: function() {
    var city = Session.get(CITY)
    return courtsData.find({city:city}, {sort: {index : 1}})
  },
 
})

Template.matchperson1.events({
   'submit': function(event, template) {
      event.preventDefault();
      //var court = courtsData.findOne({"_id":$("#courtSelect").val()});
      Router.go("/matchpersoncard/"+$("#courtSelect").val())

   },
   'click #caddie':function(event,template){
      event.preventDefault();
       Router.go("/matchpersoncardQR/"+$("#courtSelect").val())
   },
   'change #citySelect':function(event){
      event.preventDefault();
      Session.set(CITY,$("#citySelect").val())
   }

  });