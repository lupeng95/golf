(function(){

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

Meteor.methods({
  getSMSCode : function (tel) {
    var accountSid = "7f7911ecdae6fb081187491a466f5c88";
    var appId = "76dd47144c0c4930a84bca3cdac3dfa8";
    var authToken = "94c729339ad6d1a7912a6a198d0bc964";
    var templateId = "1";
    var smscode = getRandom(tel,9999);
    var templateStr ={
    "templateSMS" :
      {
        "appId"       : accountSid,
        "param"       : smscode,
        "templateId"  : 1,
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
    var result = HTTP.call("POST", url,{data: templateStr, headers: headerStr, timeout: 3000});
    //目前是返回状态编码
    return result.data.resp.respCode;
    },
  resetUserPassword : function(userId,newPassword){
    Accounts.setPassword(userId,newPassword);
  }

  });

})();

