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
var widthAvatar = 128;
var heightAvatar = 128;
var tempcanvas, options_orientation;
Meteor.subscribe('images');
var headerStr = {"content-type":"multipart/form-data"};
var imageServerUrl=avaterBaseURL+"api/photo";

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
         
        loadImage(file, function(img){
            tempcanvas =img;
            $('#realImage').attr('src', img.toDataURL("image/png"));
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
            $('#orientation').val(options_orientation);
        },{orientation: options_orientation, maxHeight:500,canvas: true});
      });
    },
    'click #changeAvatarButton': function(evt, tmp){
        evt.preventDefault();
        var userId = Meteor.user()._id;
        processChangeAvatar(tmp,userId);
    },
    'click #changeAvatarDirection': function(evt, tmp){
       evt.preventDefault();

        var orientation_c = parseInt($('#orientation').val())+1;
        if(orientation_c > 8){
            orientation_c =1;
        }
        $('#orientation').val(orientation_c);
        var avatarFile = $('input[name=avatarFile]').addClass('hide');
        loadImage(avatarFile[0].files[0], function(img){
            var size = $('#picDiv img').size();
            var imgs = $('#picDiv img');
            var pic = $('#picDiv img')[0];
            pic.src = img.toDataURL("image/png");
            $('#picDiv').html(avatarFile);
            $('#picDiv').append(pic);
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
        },{orientation: orientation_c, maxHeight:500,canvas: true});
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
}

    return blob;
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
// 直接传送图片
        var avatar_base64 = scedimg.toDataURL();
        var result = Meteor.call('sendAvatar', userId, imageServerUrl, avatar_base64, function(error, result) {
                if(error) {
                    bootbox.alert('头像传送失败 :(');
                } else {
                   Router.go('/profile');
                }
            });

        // var result = HTTP.call("POST", imageServerUrl,{params: {avatar: avatar_base64}});

//由于部分安卓 4.4.2 系统的formdata 对像在传送blob的时候异常，所以采取直接使用paramter 发送图片内容.
//以下是之前的方式：
        // scedimg.toBlob(
        //   function(blob){
        //     var xhr = new XMLHttpRequest();
        //     var formData = new FormData();
        //     formData.append(userId, blob);
        //     xhr.open('POST', imageServerUrl, true);
        //     xhr.send(formData);
        //     xhr.onload = function(e) {
        //         Router.go('/profile');
        //     };
        // });
              
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

function base64toBlob(base64Data, contentType) {
    contentType = contentType || '';
    var sliceSize = 1024;
    var byteCharacters = atob(base64Data);
    var bytesLength = byteCharacters.length;
    var slicesCount = Math.ceil(bytesLength / sliceSize);
    var byteArrays = new Array(slicesCount);

    for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
        var begin = sliceIndex * sliceSize;
        var end = Math.min(begin + sliceSize, bytesLength);

        var bytes = new Array(end - begin);
        for (var offset = begin, i = 0 ; offset < end; ++i, ++offset) {
            bytes[i] = byteCharacters[offset].charCodeAt(0);
        }
        byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
}

Template.profile.rendered = function(){



};



