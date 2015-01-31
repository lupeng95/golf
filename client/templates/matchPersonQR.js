

Template.matchpersoncardQR.rendered = function() {
  var hostname=window.location.hostname;
  var port=window.location.port;
  var user = Meteor.user()
  console.log("http://"+hostname+":"+port+"/matchcaddie/"+Router.current().params._id+"/"+user.username)
  jQuery('#qrcode').qrcode({width: 180,height: 180,text: "http://"+hostname+":"+port+"/matchcaddie/"+Router.current().params._id+"/"+user.username});
  
}

