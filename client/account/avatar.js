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
var tempcanvas, options_orientation;
Meteor.subscribe('images');
// FS.debug = true;

Template.editYourAvatarModalBody.events({
    'change input[name=avatarFile]': function(evt, tmpl){
        evt.preventDefault();
        $('#realImage').attr('src','');
        $('#changeAvatarButton').removeClass('hide');
        $('#changeAvatarDirection').removeClass('hide');
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

    
        tempcanvas = loadImage(file, function(img){
            $('#realImage').attr('src', img.toDataURL());
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
        },{orientation: options_orientation, maxHeight:500, maxWidth: $("#picDiv").width(),canvas: true});
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

function dataURItoBlob(dataURI, dataTYPE) {

  var blob;
  var str = atob(dataURI.split(',')[1]), array = [];

  for(var i = 0; i < str.length; i++) array.push(str.charCodeAt(i));

 //var array = new Uint8Array(array);
 var array = new Int8Array(array);
 try {
    // blob = new Blob([array], {type: dataTYPE});
     var bb = new BlobBuilder();
        bb.append([array]);
        blob = bb.getBlob(dataTYPE);

} catch(e) {
     window.BlobBuilder = window.BlobBuilder || 
                         window.WebKitBlobBuilder || 
                         window.MozBlobBuilder || 
                         window.MSBlobBuilder;
    if(e.name == 'TypeError' && window.BlobBuilder){
       
        var bb = new BlobBuilder();
        bb.append([array]);
        blob = bb.getBlob(dataTYPE);
    }
    else if(e.name == "InvalidStateError"){
        // InvalidStateError (tested on FF13 WinXP)
   
        blob = new Blob( [array.buffer], {type : dataTYPE});
    }
    else{
        alert(e)
        // We're screwed, blob constructor unsupported entirely  
         alert("No Way!!."); 
    }

    // if (window.BlobBuilder){
    //     blob = new BlobBuilder();
    //     blob.append(new Uint8Array(array));
    //     blob = blob.getBlob();
    // } else {
    //     alert("No Blob or BlobBuilder constructor.");
    // }
}

    return blob;
  //return new Blob([new Uint8Array(array)], {type: dataTYPE});
}

var processChangeAvatar = function(tmp,userId){

        var realImage= tmp.find('#realImage');
        orgWidth = document.querySelector('img').naturalWidth;
        scale = orgWidth/$('#realImage').width();
        var scedimg = loadImage.scale(realImage, {
                left: $('#x').val()*scale,
                top: $('#y').val()*scale,
                sourceWidth: $('#w').val()*scale,
                sourceHeight: $('#h').val()*scale,
                maxWidth: 128,
                maxHeight: 128,
                crop: true,
            });

        //alert(typeof Blob !== "undefined")
        //alert(typeof ArrayBuffer !== "undefined")

        // var imgSrc = scedimg.toDataURL("image/png");
        // //alert(imgSrc)


        // //if (imgSrc.slice(0, 5) === "data:") {
        //       var type = imgSrc.slice(5, imgSrc.indexOf(';'));
        //       var blob = dataURItoBlob(imgSrc, type);
        // //}
      
        // var avatarFile = new FS.File(blob);
    
        //var avatarFile = new FS.File(scedimg.toDataURL("image/png"));

        var avatarFile = new FS.File(scedimg.toDataURL("image/png"));
        // alert(avatarFile.data.blob.size);

        avatarFile.name('');
        avatarFile.key = userId;
        //try find existed image
        //因为没找到事务的方式，所以要doublecheck是不是只保留一条头像数据
        var existedAvatar = Images.find({key: userId});
        if(existedAvatar.count() == 0){ // create new
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
                  var avatars= existedAvatar.fetch();
                  for(var i = 0 , ln = existedAvatar.count()-1 ; i< ln ; i++ ){
                     Images.remove({_id: avatars[i]._id});
                  }
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
};

Template.profile.rendered = function(){



};



