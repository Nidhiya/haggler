// google maps 

//Geolocation API '

//globals


//------------------------------------------------------------

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






//------------------------------------------------------------------------------
//logon credentials
function initializeSDK(ORGNAME,APPNAME){	
	dataClient = new Apigee.Client({
	    orgName: ORGNAME,
	    appName: APPNAME,
	
	});	
}

//create new entitylats and longs here


function createLocation () {

	//step 1create the property object
	var properties = {
        type:'books',
        location: {
        	latitude: localStorage.getItem("latitude"),
        	longitude: localStorage.getItem("longitude")
		}
    };

    // step 2 : use the dataClient to create the entry,  functions for error and response defined here
  dataClient.createEntity(properties, function (errorStatus, response, errorMessage) {   // use the dataClient to create the entity i 
        if (errorStatus) { 
           // Error - there was a problem creating the entity
           console.log(errorMessage);
        } else { 
         // console.log(JSON.stringify(response, undefined, 4)); 
          console.log("this work");        
        }
    });
}

function queryLocation()
{

//radius
	var distance = '500000';
    
   //create the query property
	var properties = { 
		endpoint:'/books',
		method:'GET',
		qs:{ql:'location within ' + distance + ' of ' + localStorage.getItem("latitude") + ',' + localStorage.getItem("longitude")}
	};
	console.log("query properties   line 82" + properties);
	console.log("--- ---");

	/*use dataClient to request
	dataClient.request(properties, function (error, response) { 
		if (error) { 
		  
           console.log("Error message:" + JSON.stringify(error));  		                 
		} else { 
			console.log("The Answer!!!!  -----------------     ")
		 console.log( JSON.stringify(response, undefined, 4));
		} 
	}); 
*/

var data = new Apigee.Collection(
{
	"client" : dataClient,
	"type": "books",
	qs:{ql:'location within ' + distance + ' of ' + localStorage.getItem("latitude") + ',' + localStorage.getItem("longitude")}

});
//console.log(dataClient);
data.fetch(
	function(err,books)
	{
		if(err)
		{
			alert("read fail");
		}
		else
		{

var final_data = [];  //this is the final list/array of books location and all stuff
console.log(data);
elem = "<hr class=\"mini\">";
elem += "<div class=\"row  clas\">";
elem +=        "<div class=\"col-lg-4-12\">";
elem +=          "<div class=\"col-lg-4 cover\">";
elem +=             "<a class=\"pull-left\" href=\"#\">";
elem +=                     "<img class=\"media-object\" src=\"img/2.jpg\" alt=\"...\">";
elem +=            " </a>";
elem +=        "</div>";
elem +=          "  <div class=\"col-lg-6 detail\">";
elem +=                "<h4 class=\"media-heading\">";

elem2 =                " </small></h4>";
elem2 +=               "<h5><span class=\"glyphicon glyphicon-time\"></span>"
elem3 = "</h5>";
elem3 +=           "</div>";
elem3 +=          "</div>";
elem3 +=        "</div>" ;

			while (data.hasNextEntity()) {
				
var book = data.getNextEntity();
//final_data.push(book._data);

document.getElementById("list_out").innerHTML += elem + book._data.name +elem2  + book._data.category + elem3; 


}
//localStorage.setItem("finalx_data" , final_data);

//console.log(final_data[0].location.latitude);
		}




	}
	)



}

getLocation();
initializeSDK("praveen.s","sandbox");
queryLocation();












