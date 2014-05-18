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

function queryLocation(mapx)
{

//radius
	var distance = '50000';
    
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
			while (data.hasNextEntity()) {
				
var book = data.getNextEntity();
final_data.push(book._data);


}
//localStorage.setItem("finalx_data" , final_data);
loadmap(final_data,mapx);
//console.log(final_data[0].location.latitude);
		}




	}
	)



}


//------map

function initMap()
{
	
var myLatlng = new google.maps.LatLng(localStorage.getItem("latitude"), localStorage.getItem("longitude"));

  var mapOptions = {
    zoom: 12,
    center: myLatlng
  }
  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: 'Im Here!'
  });

  getLocation();
initializeSDK('praveen.s','sandbox');
//createLocation();
queryLocation(map);
//loadmap(localStorage.getItem("finalx_data"));


}

function loadmap(rev,mapx)
{

console.log(rev);
  //-------
  var markers = [];
  for (var i =0; i< rev.length;i++)
  {
    var latlng = new google.maps.LatLng(rev[i].location.latitude, rev[i].location.longitude); 
    console.log(rev[i]);

    var marker2 = new google.maps.Marker({
                                
                                position: latlng,
                                map: mapx
                            
                            });

/*
    google.maps.event.addListener(marker2, 'click', function() {
                
              //  console.log(marker.position);
                infowindow.open(map, marker);
              });
*/
              markers.push(marker2);

  }
  var mcOptions = { gridSize: 50 };
           // var markerCluster = new MarkerClusterer(map, markers, mcOptions);

}
// --------------------------


//console.log("-------------------------------------------------------------------------------------------------");
//
//console.log("Creating Location-------------------------------------------------------------------------------------------------");
//
//console.log("Querying Location-------------------------------------------------------------------------------------------------");
//

google.maps.event.addDomListener(window, "load", initMap);










