$(function() {
	// Initializing the SDK
	var client = new Apigee.Client({
	                orgName:'praveen.s', // Your Apigee.com username for App Services
	                appName:'sandbox' // Your Apigee App Services app name
	            });

	// client.GetLoggedInUser(function(err, data, user){
	// 	if(err) {
	// 		window.location = "/login.html";
	// 	} else {
	// 		if (client.isLoggedIn()){
	// 			appUser = user;
	// 			//loadItems();
	// 		} else {
	// 			window.location = "/login.html"
	// 		}
	// 	}

	// });

// var loginhandler = function(username,password){
// 		client.login(username, password, function (error,response) {
// 	        if (error) {
// 	            //error — could not log user in
// 	            alert("Unable to login");
// 	        } else {
// 	            //success — user has been logged in
// 	            var token = dataClient.token;
// 	            console.log("token")
// 	        }
// 	    });
// }

var login_btn = document.getElementById("login_btn");
var username = document.getElementById("username").value;
var password = document.getElementById("password").value;
console.log(username, password);

login_btn.addEventListener("click", function(username,password){
		client.login(document.getElementById("username").value,document.getElementById("password").value
, function (error,response) {
	        if (error) {
	            //error — could not log user in
	            alert("Unable to login");
	        } else {
	            //success — user has been logged in
	            var token = client.token;
	            console.log(token);

	            //------------------------------- test -------------------
	            client.getLoggedInUser(function(err, data, user) {
            if(err) {
                // Error - could not get logged in user
                console.log("error");
            } else {
                // Success - got logged in user

                // You can then get info from the user entity object:
                var username = user.get('username');
                console.log(username);
                window.location.replace("home.html");
            }
        });

	        }
	    });
}, false);
});
