function trueFunc() {return true;}
function falseFunc() {return false;}

Meteor.methods({
    updateAvatar: function(base64) {
        var id = this.userId;
        if (!id) {
            throw new Meteor.Error(403, "You must be logged in");
        }
        try {
            console.log(id);
            validateImgBase64(base64);
            return Meteor.users.update({_id: id},
                {$set: {'profile.avatar': base64, 'profile.upgraded': new Date()}}
            );
        }
        catch(e){
            throw new Meteor.Error(403, e.message);
        }
        return true;
    }
});

Images.allow({
  insert: trueFunc,
  update: trueFunc,
  remove: trueFunc,
  download: trueFunc
});