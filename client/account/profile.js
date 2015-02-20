var membership_limit = 5;
var hobby_limit = 3;

Template.profile.helpers({
		sex : function () {
			return Meteor.user().username;
		},
		fetchUserId : function(phone){
		var users =	Meteor.users.find({username: phone});
        var id =users.fetch()[0]._id;
		return id;
		},
		profile : function(){
		var user =	Meteor.users.find({_id: Meteor.user()._id});
		return user;
		},
		noLoginUser:function(){
			Router.go("/sign-in");
		}
	});
	
Template.profile.events({
    'click #logout-btn': function (event, template) {
      event.preventDefault();
     Meteor.logout(function (error, result){
        if(!error){//这里后面需要增加更多判断，按照状态编码
          Router.go("/");
          return true;
        }else{
          Session.set(ERROR_MESSAGE, "登出失败!");
          return false;
        }
         Session.set(USER_TEL,tel);
      });
    },
    'click #equipBtn':function(event, template) {
    event.preventDefault();
    var stat = $(event.currentTarget).attr("stat");
    if(stat==1){
      $("#equipBtnText").html('展开&nbsp;<span class="glyphicon glyphicon-chevron-down" ></span>');
      $(".equipItem").hide();
      $(event.currentTarget).attr("stat","0");
    }else{
		$("#equipBtnText").html('收起&nbsp;<span class="glyphicon glyphicon-chevron-up" ></span>');
        $(".equipItem").show();
        $(event.currentTarget).attr("stat","1");
         }
    },
    'click #change-avatar': function () {
       Router.go('/avatar');
    },
    'change select[name=hobby]': function(evt, tmpl){
      var hobby = $('.selectpicker').val().split(',');
      if(hobby == ''){
         if($('#sel-hobby :selected').size() >= hobby_limit ){
          $('.selectpicker').unwrap();
          return;
         }
      }
      if($('#sel-hobby :selected').size() > hobby_limit ){
        $('.selectpicker').selectpicker('val',hobby);
        $('.selectpicker').unwrap();
        return;
      }
    },
    'click #add-membership': function(evt, tmpl){
     // check values
     var limit = $('#membership-club-p div').size();
     var city = $('#membership-city :selected');
     var club = $('#membership-club').val();
     if(limit >= membership_limit){
        alert("最多只能填写 6 个会籍.");
        return;
     }
     if(city.val() == 0 ){//未选择城市
       $('#membership-city').focus();
       return;
     }
     if($('#membership-club').val() == ''){
      $('#membership-club').focus();
      return;
     }
     $('#membership-club-p').append("<div class=\"alert alert-info alert-dismissible\" role=\"alert\"> <button id=\"del-membership\" type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span> </button>"
      +"<p>城市: "+city.text() +"<br> 俱乐部: " + $('#membership-club').val()+"<br>更新时间: "+moment().format("YYYY MMM Do") +"</p></div>");
     
    }
});

Template.profile.rendered = function(){
  Session.set(ERROR_MESSAGE, '');
  var profile = Meteor.user().profile;
  var sex = profile.sex;
  var status = profile.status;
  var position = profile.position;
  var hobby = profile.hobby;
  var membership = profile.membership;
  var driver = profile.driver;
  var fairway_wood = profile.fairway_wood;
  var hybrid = profile.hybrid;
  var irons = profile.irons;
  var wedges = profile.wedges;
  var putter = profile.putter;
  var shoe = profile.shoe;
	document.getElementById("sel-sex")[sex].selected=true;
  document.getElementById("sel-status")[status].selected=true;
  //document.getElementById("sel-position")[position].selected=true;
  document.getElementById("sel-driver")[driver].selected=true;
  document.getElementById("sel-fairway-wood")[fairway_wood].selected=true;
  document.getElementById("sel-hybrid")[hybrid].selected=true;
  document.getElementById("sel-irons")[irons].selected=true;
  document.getElementById("sel-wedges")[wedges].selected=true;
  document.getElementById("sel-putter")[putter].selected=true;
  document.getElementById("sel-shoe")[shoe].selected=true;
  $('.selectpicker').selectpicker({mobile: true});
  
  if(hobby && hobby !== ''){
    var hobbys = hobby.split(',');
    $('.selectpicker').val(hobbys);
    $('.selectpicker').selectpicker('render');
  }
  for(m in membership){
  $('#membership-club-p').append("<div class=\"alert alert-info alert-dismissible\" role=\"alert\"> <button id=\"del-membership\" type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span> </button>"
      +"<p>"+membership[m] +"</p></div>");
  }
};




