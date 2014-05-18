$(function() {
	// Initializing the SDK
	var client = new Apigee.Client({
	                orgName:'praveen.s', // Your Apigee.com username for App Services
	                appName:'sandbox' // Your Apigee App Services app name
	            });

function getLocation()  //to get geolocation in lat and long
{
	//var locationf;
	locationf = navigator.geolocation.getCurrentPosition(function success(location)  // on success
{
		//window.latitude = location.coords.latitude;
		localStorage.setItem("latitude", location.coords.latitude);
		//window.longitude = location.coords.longitude;
		localStorage.setItem("longitude", location.coords.longitude);
		//console.log(location.coords);
		
}, function error()
{
return "Unable to Get Location";
} );	
}

var submit_btn = document.getElementById("submit_btn");
submit_btn.addEventListener("click",function  () {
	// body...
	localStorage.setItem("name", document.getElementById('name').value);
localStorage.setItem("category", document.getElementById('category').value);
localStorage.setItem("description", document.getElementById('description').value);
localStorage.setItem("landmark", document.getElementById('landmark').value);
localStorage.setItem("contact", document.getElementById('contact').value);


var properties = {
        type:'books',
        name: localStorage.getItem("name"),
        category: localStorage.getItem("category"),
        description: localStorage.getItem("description"),
        landmark: localStorage.getItem("landmark"),
        contact: localStorage.getItem("contact"),
        location: {
        	latitude: localStorage.getItem("latitude"),
        	longitude: localStorage.getItem("longitude")
		}
    };
    console.log(" event fires");

//Create the entity and process the results
client.createEntity(properties, function (error, result) {
	if (error) {
	    //error
	    console.log("Error in creation    line 52")
	} else {
	    //success         
	    alert("sucess");
	}
});    
},false);


});
