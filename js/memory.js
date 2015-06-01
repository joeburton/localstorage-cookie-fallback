memory = {
	storageMethod: "none",
	
	init: function(){
		// Check localStorage support, fall back to cookies if not
		if (memory.localStorageEnabled()) {
		    memory.storageMethod = "localstorage";
		} else if (memory.cookiesEnabled()) {
		    memory.storageMethod = "cookies";
		} else {
		    memory.storageMethod = "none";
		}
	},

	storeValue: function(variable, value) {
	    if(memory.storageMethod == "localstorage") {
	        localStorage.setItem(variable, value);
	    } else if (memory.storageMethod == "cookies") {
	        memory.createCookie(variable, value, 1000);
	    }
	},

	readValue: function(variable) {
	    if (memory.storageMethod == "localstorage") {
	        var result = localStorage.getItem(variable);
	    } else if (memory.storageMethod == "cookies") {
	        var result = memory.readCookie(variable);
	    }
	    return result;
	},

	cookiesEnabled: function(){
	 	var val = "testing";
		try {
			memory.createCookie(val, "Hello", 1);
			memory.readCookie(val);
			memory.eraseCookie(val);
			return true;
		} catch(e) {
			return false;
		}
	},

	localStorageEnabled: function(){
		var val = "testing";
		try {
			localStorage.setItem(val, val);
			localStorage.removeItem(val);
			return true;
		} catch(e) {
			return false;
		}
	},

	createCookie: function(name, value, days) {
	    var expires;
	    if (days) {
	        var date = new Date();
	        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
	        expires = "; expires=" + date.toGMTString();
	    } else expires = "";
	    document.cookie = name + "=" + value + expires + "; path=/";
	},

	readCookie: function(name) {
	    var nameEQ = name + "=";
	    var ca = document.cookie.split(';');
	    for (var i = 0; i < ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
	        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	    }
	    return null;
	},

	eraseCookie: function(name) {
	    memory.createCookie(name, "", -1);
	}
}