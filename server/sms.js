(function(){

  test_sms = false;
  
  var getDate = function(){
    var pad = function(number){
      if ( number.valueOf ( ) < 10 ) {
        return "0" + number.toString ( );
    } else {
        return number.toString ( );
    }
    };
    var now = new Date();
    var y = now.getFullYear ( );
    var m = now.getMonth ( ) + 1;
    m = pad(m);
    var d = now.getDate();
    d = pad(d);
    var h = now.getHours();
    h = pad(h);
    var mm = now.getMinutes();
    mm = pad(mm);
    var s = now.getSeconds();
    s = pad(s);
    currentDate= y + m + d + h + mm + s;
    return currentDate;
  };

  var getRandom = function(top){
    var random = Math.floor((Math.random()*(top)));
    if(random > 100 & random < 1000){
      random="0"+random;
    } else if (random> 10 & random < 100){
      random="00"+random;
    }else if (random < 10) {
      random="000"+random;
    }
    return random;
  };

  var userExist = function(tel){
    console.log(tel);
    if(Meteor.users.find({username:tel}).count() == 1){
      return true;
    }
    console.log("用户不存在!");
    return false;
  };

Meteor.methods({
  getSMSCode : function (tel,exist) {
    if(exist != userExist(tel)){
        var smsResult = {"error": true};
        return smsResult;
    }
    var accountSid = "7f7911ecdae6fb081187491a466f5c88";
    var appId = "fceadbf8f1a4428eb7139c037b1e8729";
    var authToken = "94c729339ad6d1a7912a6a198d0bc964";
    var templateId = 2483;
    var smscode = getRandom(9999);
    console.log(smscode);
    var templateStr ={
    "templateSMS" :
      {
        "appId"       : appId,
        "param"       : smscode,
        "templateId"  : templateId,
        "to"          : tel
       }
    };

    var baseUrl = "https://api.ucpaas.com";
    var softVersion = "/2014-06-30";
    var account = "/Accounts/"+accountSid;
    var func = "/Messages/templateSMS";
    var currentDate = getDate();
    var sigParameter = "?sig="+CryptoJS.MD5(accountSid+authToken+currentDate).toString().toUpperCase();
    var authorization = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(accountSid+":"+currentDate));
    var headerStr = {"content-type":"application/json;charset=utf-8;","Accept":"application:json","Authorization":authorization};
    var url = baseUrl+softVersion+account+func+sigParameter;
    var successSms = false;
    // send smscode to user tel.
    var status = '';
    if(test_sms === true){
        result = { statusCode: 200, data: { resp: { respCode: '000000', templateSMS: [Object] } } };
        status = result.data.resp.respCode;
        console.log("for testing");
    }
    else
    {
    var result = HTTP.call("POST", url,{data: templateStr, headers: headerStr, timeout: 1000});
    status = result.data.resp.respCode;
    console.log(status);
    }
       //目前是返回状态编码
    switch(status){
        case "105122" :
        console.log("当天发送短信已经达到最大值");
        break;
        case "100000" :
        console.log("金额不为整数");
        break;
        case "100001" :
        console.log("余额不足");
        break;
        case "000000" :
        console.log("发送成功");
        break;
    }
    var id=0;
    if(status == "000000"){
        var ret = {"smscode": smscode,createdAt:new Date(),tel:tel,verify:false};
        id = SecCode.insert(ret);
    }
    // console.log(smsResult);
    var smsResult = {"smscode": id,"respcode": status};
    return smsResult;
    },
  verifySMSCode : function(code,id){
        var ret={code:-1};
        var sCode = SecCode.findOne(id);
        if(sCode){
            if(code==sCode.smscode){
                ret.code=0;
                sCode.verify=true;
                SecCode.update(id,sCode);
            }
        }
        return ret;

    },
  resetUserPassword : function(username,newPassword){
        //get _id by useranme
    var user = Meteor.users.find({username:username});
    var userId =user.fetch()[0]._id;
    //delete smscode record.
    var sCode = SecCode.findOne({tel:username});
    SecCode.remove({_id:sCode._id});
    Accounts.setPassword(userId,newPassword);
  },
  getUserId : function(tel){
  return Meteor.users.find({username:tel}).fetch()._id;
  }

  });

})();

Accounts.validateNewUser(function (user) {
    var sCode = SecCode.findOne({_id:user.username});
    if(sCode && sCode.verify){
        user.username = sCode.tel;
        //delete smscode record.
        SecCode.remove({_id:sCode._id});
        return true;
    }
  throw new Meteor.Error(405, "验证码错误");
});


