Handlebars.registerHelper('getAvator', function(avator) {
		if(!avator || avator =="default_url"){
			return "\\img\\icon4.jpg"
		}
        return avator;
    }
);