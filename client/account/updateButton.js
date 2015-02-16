
Template.updateButton.events({
 'click #update-profile': function () {
      Session.set(ERROR_MESSAGE,'');
      var nick_name=$("#nick-name").val();
      if(nick_name.length < 2){
        Session.set(ERROR_MESSAGE, "用户名不能少于2个字");
        return;
      }
      var ball_age_years=$("#ball-age").val();
      if(isNaN(ball_age_years)){
        Session.set(ERROR_MESSAGE, "球龄必须是数字");
        document.getElementById("ball-age").focus();
        return;
      }
      if(ball_age_years > 99){
        Session.set(ERROR_MESSAGE, "我们只接受球龄小于99年的人士...ORZ");
        return;
      }
      var ball_age = moment().add('years',-ball_age_years).unix();
      var sex = $("#sel-sex").val();
      var status = $("#sel-status").val();
      var position = $("#sel-position").val();
      var hobby = '';
       $('#sel-hobby :selected').each(function(i, selected){
        hobby = hobby + $(selected).val()+',';
      });
      hobby = hobby.substr(0,hobby.lastIndexOf(','));
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
              'profile.ball_age': ball_age, 'profile.position': position, 'profile.hobby': hobby,
              'profile.company': company,'profile.des': des,'profile.driver': driver,
              'profile.fairway_wood':fairway_wood, 'profile.hybrid':hybrid,
              'profile.irons':irons, 'profile.wedges': wedges, 'profile.putter': putter,'profile.shoe':shoe}});
     
    Router.go('/');
  }

});