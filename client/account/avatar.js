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
var options = {canvas: true};
var widthAvatar = 128,
heightAvatar = 128;
var tempcanvas= null;
var options_orientation = 1;
Meteor.subscribe('images');

Template.editYourAvatarModalBody.events({
    'change input[name=avatarFile]': function(evt, tmpl){
        evt.preventDefault();
        $('#realImage').attr('src','');
        $('#changeAvatarButton').removeClass('hide');
        $('#avatarChooseFile').addClass('hide');
        e = evt.originalEvent;
        var target = e.dataTransfer || e.target,
            file = target && target.files && target.files[0];
            if (!file) {
                return;
            }
            loadImage.parseMetaData(file, function (data) {
                if (data.exif) {
                    options_orientation = data.exif.get('Orientation');
                }
            });
            tempcanvas = '';
            tempcanvas = loadImage(file,options);
             $('#realImage').attr('src', tempcanvas.src);
            var w = screen.width;
            var h = screen.height;
            if(w>h){
                w =h;
            }
            w = w * 0.6;
            $('#realImage').Jcrop({
                    onChange: showCoords,
                    onSelect: showCoords,
                    aspectRatio: 1,
                    setSelect: [ 0, 0, w, w ],
                    allowResize: false,
                    allowSelect: false
                });
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
        scale = $('#realImage').width();
        orgWidth = document.querySelector('img').naturalWidth;
        scaleXY = orgWidth/$('#realImage').width();
        var scedimg = loadImage.scale(tempcanvas, {
                left: $('#x').val()*scaleXY,
                top: $('#y').val()*scaleXY,
                sourceWidth: $('#w').val()*scaleXY,
                sourceHeight: $('#h').val()*scaleXY,
                maxWidth: 128,
                maxHeight: 128,
                crop: true,
                orientation: options_orientation
            });
        var avatarFile = new FS.File(scedimg.toDataURL("image/png"));
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
    $('#w').val(c.w);
    $('#h').val(c.h);
};

function loadImagefile(tmp, src){
    $(tmp.find('#realImage')).attr('src', src);
    // $(tmp.find('#preview img')).attr('src', src);
};

