/**
 * HELPERS
 */
var x, // x position of crop image
y, // y position of crop image
width, // width of crop image
height, // height of crop image
error, // 
saveAvatarButton,
modal,
realImage,
displayImage,
jcrop_api,
isShowCropAndButton = false;

var widthAvatar = 128,
heightAvatar = 128;

Meteor.subscribe('images');

Template.editYourAvatarModalBody.events({
    "change input[name=avatarFile]": function(evt, tmpl){
        evt.preventDefault();
        $('#changeAvatarButton').removeClass('hide');
        $('#avatarChooseFile').addClass('hide');
        var input = tmpl.find('input[name=avatarFile]');
        if(input.files && input.files[0]){
            FileReaderObject.previewImage(input.files[0], function(err, file){
                if (err){
                    console.log(err);
                }
                else {
                    loadImagefile(tmpl, file.result);
                    // processChangeAvatar(tmpl);
                }
            });
        }
    },
    'click #changeAvatarButton': function(evt, tmp){
        evt.preventDefault();
        var userId = Meteor.user()._id;
        processChangeAvatar(tmp,userId);
    }
});
/**
 * FUNCTION CLASS DEFINE
 */
var processChangeAvatar = function(tmp,userId){

        var realImage= tmp.find('#realImage');
        // alert(canvas.toDataURL().length);
        var canvas = document.createElement("canvas");
        canvas.width = 128;
        canvas.height =128;
        // orgWidth = document.querySelector('img').naturalWidth;
        scale = $('#realImage').width();
        orgWidth = document.querySelector('img').naturalWidth;
        scaleXY = orgWidth/$('#realImage').width();
        var scedimg = loadImage.scale(realImage, {
                left: $('#x').val()*scaleXY,
                top: $('#y').val()*scaleXY,
                sourceWidth: $('#w').val()*scaleXY,
                sourceHeight: $('#h').val()*scaleXY,
                maxWidth: 128,
                maxHeight: 128,
                crop: true,
            });
        ctx = canvas.getContext("2d");
        ctx.drawImage(scedimg,0,0,128,128);
        var avatarFile = new FS.File(canvas.toDataURL("image/png"));
        avatarFile.name('');
        avatarFile.key = userId;
        //try find existed image
        var existedAvatar = Images.findOne({key: userId});

        if(!existedAvatar){ // create new
           Images.insert(avatarFile, function (err, fileObj) {
               if(err){
                alert(err);
               }else{
                Router.go('/profile');
               }
           });
        }else{
           Images.insert(avatarFile, function (err, fileObj) {
               if(err){
                alert(err);
               }else{//after added new avatar , delete old one.
                  Images.remove({ _id: existedAvatar._id });
                  Router.go('/profile');
               }
            });
        }

};

function showCoords(c)
{
    $('#x').val(c.x);
    $('#y').val(c.y);
    $('#x2').val(c.x2);
    $('#y2').val(c.y2);
    $('#w').val(c.w);
    $('#h').val(c.h);
};

function loadImagefile(tmp, src){
    $(tmp.find('#realImage')).attr('src', src);
    $(function(){
        $('#realImage').Jcrop({
            onChange: showCoords,
            onSelect: showCoords,
            aspectRatio: 1
        });
    });
    // $(tmp.find('#preview img')).attr('src', src);
};

