FILEUPLOAD = {
    IMG : {  TYPE: ["image/jpeg", "image/png"], MAXSIZE: 4096000 },
    DOC : []
};

FileReaderObject = {
    previewImage: function(file, callback){
        var reader = new FileReader();
        reader.onload = function (e) {
            // check file
            console.log("onload")
            if(!_.contains(FILEUPLOAD.IMG.TYPE, file.type)){
                callback(new Meteor.Error(412, "File format not supported. Please upload .jpg or .png"));
                return;
            }
            // check size
            if(file.size > FILEUPLOAD.IMG.MAXSIZE){
                callback(new Meteor.Error(412, "File is too large. 512kb size limit"));
                return;
            }
            console.log("onload end")
            console.log(file)

            file.result = e.target.result;
            callback(null, file);
        };
        reader.onerror = function () {
            console.log("onerror end");
        };
        reader.readAsDataURL(file);
    }
};