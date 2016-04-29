/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 
 function add1(abc)  {
    alert("abc  "+abc);	 
 };

	var currentLocation = { lat : 0,
                            lng : 0 };
    var previousLocation = { lat : 0,
                            lng : 0 };
var counter = 0;
var userInput = 0;
var incr = 0.01;
var myCenter= new google.maps.LatLng(38.947973         , -77.362595); // work 
var home    = new google.maps.LatLng(38.943714299999996, -77.4067539); // home
var map=null;

var markers = [];


var bounds ; 

/*var markersOLd = [
   ['work', 38.947973         , -77.362595, 2],
      ['home', 38.943714299999996, -77.4067539, 1] 
    ];

  markers["work"] = new google.maps.Marker({
    position: new google.maps.LatLng(    38.947973 , -77.362595) ,
    map: map,
    title: 'Work 1 '
  });


markers["tkw"] =new google.maps.Marker({
    position: new google.maps.LatLng(38.8945501,-77.4296397),
    map: map,
    title: 'TKWON DO '
  });
*/

var destination=new google.maps.Marker({
  position:myCenter,
  });

var app = {

  work :  { lat : 38.947973, lng :  -77.362595 }, // work 
  //home  :   new google.maps.LatLng(38.943714299999996, -77.4067539), // home

    // Application Constructor
    initialize: function() {
  //       this.initializeMaps();
        this.bindEvents();
    },
	
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
	},
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
		//console.log(Media);
	
		//this.playAudio("../media/arrived.wma");
    },
	
	
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
/*        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
*/        console.log('Received Event: ' + id);
    },
	
  getDistanceFromLatLonInKm : function(lat1,lon1,lat2,lon2) {
	  console.log("calculating !!!!!!" + lat1 +  " " + lon1  + " Second Par lat:" + lat2 + " Lon:" + lon2 );
  var R = 6371; // Radius of the earth in km
  var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
  var dLon = this.deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}, 

 deg2rad : function (deg){
	// alert("deg2rad");
  return deg * (Math.PI/180)
},




// Sets the map on all markers in the array.
 setMapOnAll : function(map) {
  var keys  = Object.keys(markers);
  var mybounds = new google.maps.LatLngBounds();
  
//if(map) { 
$.each(keys,  function(index, value) { 
  console.log(" setMapOnALL" +index + ': '+ value + " : "+markers[value]); 
   markers[value].setMap(map);
  mybounds.extend( markers[value].getPosition());
});
 
  if(keys.length > 1 && map) {
      map.fitBounds(mybounds);
  }
//}
   
},


// Adds a marker to the map and push to the array.
 addMarker : function(location) {

  //  ['work', 38.947973         , -77.362595, 2]
console.log("adding " +location.lat() + " , " +  location.lng());
userInput++;
  var newmarker = new google.maps.Marker({
    position: location,
    map: map
  });

 // var newMarker[] = [ "Your Selection", position.coords.latitude, position.coords.longitude ]; 
  markers["selected"+userInput] = newmarker;
  app.setMapOnAll(map);
},


//Removes markers from the map, but keeps them in the array.
clearMarkers : function() {
  app.setMapOnAll(null);
  markers=[];
  userInput=0;
},

// Shows any markers currently in the array.
 showMarkers : function() {
  app.setMapOnAll(map);
},


 placeMarker : function(location) {
  var marker = new google.maps.Marker({
      position: location, 
      map: map
  });

  map.setCenter(location);
},

 initializeMaps: function()
{
// alert("intitialize Maps");
ion.sound({
    sounds: [
        {
            name: "bell_ring"
        },
        {
            name: "arrived"
        },
         
         
    ],
    volume: 1,
    path: "media/",
    preload: true
});

var mapProp = {
  center:myCenter,
  zoom:12,
  mapTypeId:google.maps.MapTypeId.ROADMAP
  };

 map=new google.maps.Map(document.getElementById("googleMap"),mapProp);

 // This event listener will call addMarker() when the map is clicked.
  map.addListener('click', function(event) {
    app.addMarker(event.latLng);
  });
 

 this.setMapOnAll(map);  

},


Recalculate : function(){
console.log("Recalculate :  markers.length="+markers.length);
//console.log(destination); 

},

 getCurrentLocation : function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
//			console.log(" in current " + position.toString());
			console.log(" the getCurrentLocation latitude :"+position.coords.latitude + "  longtitude : "  + position.coords.longitude);
			currentLocation.lat=position.coords.latitude;
			currentLocation.lng=position.coords.longitude;	

	});
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
},

watchPosition  : function() {

console.log("watching ");   
  var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};


  id = jQuery.proxy(navigator.geolocation.watchPosition(function(position) {
	   
     console.log("before incr");   
     destination.setPosition(
new google.maps.LatLng(
            position.coords.latitude ,
            position.coords.longitude )
      );

//destination.title="current";

var infowindow = new google.maps.InfoWindow({
    content: "<span>any html goes here</span>"
});

 

//google.maps.event.addListener(destination, 'click', function() {
 // infowindow.open(map,destination);
//});
//   console.log("after incr");   
     markers["current"] = destination;
     app.setMapOnAll(null);
     app.setMapOnAll(map);
     //setTimeout(function(){ setMapOnAll(map);   }, 1000); 
     
//destination.setMap( map );
    // console.log("WA  after set map");    

     //app.Recalculate();
			counter++;
			console.log("WA this is in counter : "  + counter );
			console.log("WA Result of Watch Position  latitude :"+position.coords.latitude + "  longtitude : "  + position.coords.longitude);
			if(previousLocation.lat = 0 ) {
				previousLocation.lat=position.coords.latitude;
				previousLocation.lng=position.coords.longitude;	
			currentLocation.lat=position.coords.latitude;
			currentLocation.lng=position.coords.longitude;	
				 
				console.log("WA : " + previousLocation.lat  + " <---- lat  previous was null  now lan ---> " + previousLocation.lng );
			} 
	else {
				previousLocation=currentLocation;
			currentLocation.lat=position.coords.latitude;
			currentLocation.lng=position.coords.longitude;	
			console.log("WA else 1 : " +previousLocation.lat  + " <---- lat  previous in else  lan ---> " + previousLocation.lng );
		   	console.log("WA else 2: " +currentLocation.lat +  " in else the current location  = " + currentLocation.lng);			

		   	console.log("WA else 3 : " +app.work.lat +  " in else the  WORK  = " + app.work.lng);			
			

      var keys  = Object.keys(markers);
      var amarker;
      if(keys.length > 0 ) {
        document.getElementById('distance').innerHTML = "";
$.each(keys, function(index, value) { 

  console.log(" WA each Loop  : " +index + ': '+ value + " : "+markers[value]); 
  if(value != "current") {
//   for (i = 0; i < markers.length; i++) {  
      amarker =  markers[value];

//console.log(amarker.position.lat() + "  //  " +  amarker.position.lng());  



			  var x =    app.getDistanceFromLatLonInKm(currentLocation.lat, currentLocation.lng,
                        amarker.position.lat(), amarker.position.lng());
	document.getElementById('distance').innerHTML += "Wcalc Counter ( "+ counter +") : DISTANCE["+ value+ "] = :  " + x;					
						console.log("############### Counter ( "+ counter +") : DISTANCE["+ value+ "] = :  " + x);
			



			if ( x < 0.4 ) {


        ion.sound.play("arrived");  
      }
        }
    });
}

				//$('#alert').play();
		 
//	  1 var my_media =  new Media("../media/arrived.wma",function () { console.log("playAudio():Audio Success"); });
	//2 	my_media.play();
      			//$(...).play is not a function
				
				//brlow worked
					//var audio = new Audio('../media/arrived.mp3');
                   //audio.play();

      
/* this is pure html5 worked
    var audio = $("#myaudio")[0];
		 if (audio.paused) {
        audio.play();
    }else{
        audio.pause();
        audio.currentTime = 0
    }
*/				 //$('#alert').play(); 
							 
				}
	}, function error(err){
		 console.warn('ERROR in watchPosition(' + err.code + '): ' + err.message);
	}, options ), this);
	
 /* else {
	console.log("trigger else calculateDistance");
		console.log(" home " + this.home.toString );
 
 var x =    app.getDistanceFromLatLonInKm(currentLocation.lat, currentLocation.lng,
                        this.work.lat(), this.work.lng());
	document.getElementById('distance').innerHTML =  " the calculateDistance result is " + x;					
						console.log("distance is " + x );	
}*/
}
};
