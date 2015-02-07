

Template.matchpersoncardQR.rendered = function() {
  var hostname=window.location.hostname;
  var port=window.location.port;
  var user = Meteor.user()
  console.log("http://"+hostname+":"+port+"/matchcaddie/"+Router.current().params._id+"/"+user.username)
  if(port && port>80){
  	jQuery('#qrcode').qrcode({width: 180,height: 180,text: "http://"+hostname+":"+port+"/matchcaddie/"+Router.current().params._id+"/"+user.username});
  }else{
  	jQuery('#qrcode').qrcode({width: 180,height: 180,text: "http://"+hostname+"/matchcaddie/"+Router.current().params._id+"/"+user.username});
  }
  
  
  
}

