Handlebars.registerHelper('getAvatar', function(avatar) {
		if(!avatar || avatar =="default_url"){
			return "\\img\\icon4.jpg"
		}
        return avator;
});


Handlebars.registerHelper('getTime', function(t) {
		return moment(t).fromNow();
});