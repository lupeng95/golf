// function trueFunc() {return true;}
// function falseFunc() {return false;}

// Images.allow({
//   insert: trueFunc,
//   update: trueFunc,
//   remove: trueFunc,
//   download: trueFunc
// });

Meteor.methods({sendAvatar: function (userId,imageServerUrl,avatar_base64) {
	// console.log(userId);
	imageServerUrl = imageServerUrl+'?avatar='+encodeURIComponent(avatar_base64)+'&id='+userId;
	// console.log(imageServerUrl);
	var result = HTTP.call("POST", imageServerUrl);
	  if(result.statusCode==200) {
	     return true;
	  }
	return result.statusCode;
}});