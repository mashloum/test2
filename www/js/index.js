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
var app = {
  work :  { lat : 38.947973, lng :  -77.362595 }, // work 
  home  :   new google.maps.LatLng(38.943714299999996, -77.4067539), // home

    // Application Constructor
    initialize: function() {
		//alert(home.lat() + " " + home.lng() );
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
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        console.log('Received Event: ' + id);
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
   
  var options = {
  enableHighAccuracy: false,
  timeout: 5000,
  maximumAge: 0
};
  id = navigator.geolocation.watchPosition(function(position) {
	       
			counter++
			console.log("this is in counter : "  + counter );
			console.log("mywatch latitude :"+position.coords.latitude + "  longtitude : "  + position.coords.longitude);
			if(previousLocation.lat = 0 ) {
				previousLocation.lat=position.coords.latitude;
				previousLocation.lng=position.coords.longitude;	
			currentLocation.lat=position.coords.latitude;
			currentLocation.lng=position.coords.longitude;	
				 
				console.log(previousLocation.lat  + " <---- lat  previous was null  now lan ---> " + previousLocation.lng );
			} 
	else {
				previousLocation=currentLocation;
			currentLocation.lat=position.coords.latitude;
			currentLocation.lng=position.coords.longitude;	
			console.log(previousLocation.lat  + " <---- lat  previous in else  lan ---> " + previousLocation.lng );
		   	console.log(currentLocation.lat +  " in else the current location  = " + currentLocation.lng);			

		   	console.log(app.work.lat +  " in else the  WORK  = " + app.work.lng);			
			
			  var x =    app.getDistanceFromLatLonInKm(currentLocation.lat, currentLocation.lng,
                        app.work.lat, app.work.lng);
	document.getElementById('distance').innerHTML = "Counter ( "+ counter +")  the calculateDistance result is " + x;					
						console.log("distance is " + x );
			
			if ( x < 4 ) {
				//$('#alert').play();
		 
//	  1 var my_media =  new Media("../media/arrived.wma",function () { console.log("playAudio():Audio Success"); });
	//2 	my_media.play();
      			//$(...).play is not a function
				
				//brlow worked
					//var audio = new Audio('../media/arrived.mp3');
                   //audio.play();

		var audio = $("#myaudio")[0];
			
			 if (audio.paused) {
        audio.play();
    }else{
        audio.pause();
        audio.currentTime = 0
    }
				 //$('#alert').play(); 
			}				 
				}
	}, function error(err){
		 console.warn('ERROR in watchPosition(' + err.code + '): ' + err.message);
	}, options );
	


if(currentLocation.lat != 0 ) {  

  var x =    this.getDistanceFromLatLonInKm(currentLocation.lat, currentLocation.lng,
                        this.work.lat, this.work.lng());
	document.getElementById('distance').innerHTML =  " the calculateDistance result is " + x;					
						console.log("distance is " + x );
} /* else {
	console.log("trigger else calculateDistance");
		console.log(" home " + this.home.toString );
 
 var x =    app.getDistanceFromLatLonInKm(currentLocation.lat, currentLocation.lng,
                        this.work.lat(), this.work.lng());
	document.getElementById('distance').innerHTML =  " the calculateDistance result is " + x;					
						console.log("distance is " + x );	
}*/
}
};
