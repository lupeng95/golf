var CITY = "mSelectedCity";

var court;
var record=[];

function isFinish(){
  record=[]

  if(!court){
    return false;
  }
  var ret = true;

  $(".recordItem").each(function(i,val){
    
    record[i]={}
    var v,n;
    v = val.querySelectorAll("input")[0].value;
    n = parseInt(v);
    if(n){
      record[i].total = n
    }else{
      ret = false;
      return false;
    }
    

    v = val.querySelectorAll("input")[1].value;
    n = parseInt(v);
    record[i].put = n
    // if(n){    //put can be 0
    //   record[i].put = n
    // }else{
    //   ret = false;
    //   return false;
    // }

    record[i].on = val.querySelectorAll("input")[2].checked

    record[i].par = court.pars[i];
  })
  return ret;
}



Template.matchperson2.created = function() {

}
Template.matchperson2.rendered = function() {
  //$(".matchpage .card  input").eq(0).focus()
}

Template.matchperson2.helpers({
 getHoles:function(){
  
  court =  courtsData.findOne(Router.current().params._id)
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
  'blur input':function(event, template){
    
  },
  'click #confirmBtn':function(event, template){
    
    if(isFinish()){
        $('#myModal').modal('toggle')
        $("#btn-ok").html("请稍候..")
        $("#btn-ok").attr("disabled","true");
        
        
        var p={};
        var user = Meteor.user();
        p.userID = user._id;
        p.name = user.profile.nick_name;
        p.tel = user.username;
        p.courtID = court._id;
        p.courtName = court.name;
        p.city = court.city;
        
        p.record = record;
        //p.createdAt = new Date();
       

        Meteor.call('addMatch', p, function(error, result) {
          var ret = '比赛结果已储存.'
          if (error) {
            alert(error.reason);
          } else {
            $("#btn-ok").html("退出")
            $("#btn-ok").removeAttr("disabled");
            $("#btn-ok").attr("fn","1");
            Template.appBody.addNotification({
              action: '确定',
              title: ret,
              callback: function() {
                //Router.go("/")
              }
            });
          }
        });
    }else{
      Router.go("/")
    }
  },
  'click #btn-ok':function(event, template){
      if($("#btn-ok").attr("fn")=="1"){
        Router.go("/")
        return
      }
      if(isFinish()){
        $("#msg").html("提交后将无法修改成绩。确认提交?")
        $('#myModal').modal({show:true})     

      }else{
        $("#msg").html("退出后将丢失当前成绩。确认退出?")
        $('#myModal').modal({show:true})
      }
  },
  'keyup input[type=tel]':function(event, template) {
    var v = $(event.target).val();
    var num = parseInt(v);
    if($(event.target).attr("name") == "n1"){
      if(v.length ==2 || (num>1 && num<10)){
        var ind = $('input[type=tel]').index(event.target) + 1;
        if(ind < $('input[type=tel]').length){
          $('input[type=tel]').eq(ind).focus()
        }

      }
    }

    if($(event.target).attr("name") == "n2"){
      if(v.length >0){
        var ind = $('input[type=tel]').index(event.target) + 1;
        if(ind < $('input[type=tel]').length){
          $('input[type=tel]').eq(ind).focus()
        }

      }
    }
    


  }

});