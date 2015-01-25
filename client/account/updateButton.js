
Template.updateButton.events({
 'click #update-profile': function () {
      var nick_name=$("#nick-name").val();
      if(nick_name.length < 3){
        Session.set(ERROR_MESSAGE, "用户名不能少于3个字");
        return;
      }
      var ball_age=$("#ball-age").val();
      var sex = $("#sel-sex").val();
      var status = $("#sel-status").val();
      var position = $("#sel-position").val();
      var profession = $("#sel-profession").val();
      var company = $("#company").val();
      var des = $("#description").val();
      var driver = $("#sel-driver").val();
      var fairway_wood = $("#sel-fairway-wood").val();
      var hybrid = $("#sel-hybrid").val();
      var irons = $("#sel-hybrid").val();
      var wedges = $("#sel-wedges").val();
      var putter = $("#sel-putter").val();
      var shoe = $("#sel-shoe").val();
    Meteor.users.update({_id: Meteor.userId()},
      {$set: {'profile.nick_name': nick_name, 'profile.sex': sex, 'profile.status': status,
              'profile.ball_age': ball_age, 'profile.position': position, 'profile.profession': profession,
              'profile.company': company,'profile.des': des,'profile.driver': driver,
              'profile.fairway_wood':fairway_wood, 'profile.hybrid':hybrid,
              'profile.irons':irons, 'profile.wedges': wedges, 'profile.putter': putter,'profile.shoe':shoe}});
     
    Router.go('/');
  }

});