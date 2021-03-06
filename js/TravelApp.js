$(document).ready(function() {

    $("#destinationForm").validate();

    var recentSearch=["NC/Charlotte"];
    var imgUrlArr=["assets/img/loading.gif"];
    var numSearches= recentSearch.length;
    console.log(numSearches);
    var lat = "";
    var lng = "";
    var dispLoc ="";
    var lastSearch="";
    var key = "AIzaSyCq4uYyLv9Msbfrc-tgFhnIKQiZssVr1Dc";
    var count = 1;
    var showPhoto;

    var config = {
        apiKey: "AIzaSyD0FYqD4sBTgNwR56nFJn4AlS5Y8PKHJw4",
        authDomain: "testarea-50aa4.firebaseapp.com",
        databaseURL: "https://testarea-50aa4.firebaseio.com",
        storageBucket: "testarea-50aa4.appspot.com",
        messagingSenderId: "904827425656"
    };
    firebase.initializeApp(config);

    var database = firebase.database();


    function codeAddress(destination) {
        geocoder = new google.maps.Geocoder();
        // var place = $("#text").val();

        geocoder.geocode( { 'address': destination}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {

                var lat = results[0].geometry.location.lat();
                var lng = results[0].geometry.location.lng();
                dispLoc = results[0].formatted_address;
                console.log(dispLoc);

                initMap(lat,lng);
                callWeather(lat,lng);
                placePhotos(lat,lng);

                // alert("Latitude: "+results[0].geometry.location.lat());
                // alert("Longitude: "+results[0].geometry.location.lng());
                console.log("lat: "+lat+" lng: "+ lng);
                console.log(results);
            } 

            else {
                alert("Geocode was not successful for the following reason: " + status);
            }
        });//geocode request call
    }//codeAddress function

    function initMap(latitude, longitude) {
        var uluru = {lat: latitude, lng: longitude};
        console.log("initMap-uluru: "+ uluru);
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 8,
          center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
      }//initMap function



    function callWeather(lat,lng){

        // var numSearches= recentSearch.length;
        // console.log(numSearches);
        // var currentDestination = recentSearch[numSearches-1];
        // console.log(currentDestination);
        var currentDestination = lat+","+lng;
        console.log("callweather lat/lng: " + currentDestination);

      $.ajax({
        url : "http://api.wunderground.com/api/45bc54e120183165/forecast/geolookup/conditions/almanac/astronomy/q/"+currentDestination +".json",
        dataType : "jsonp",

      success : function(parsed_json) {
        var location = $('<p>').text(dispLoc);
        var locationFull = $('<p>').text(parsed_json['current_observation']['display_location']["full"]);
        var temp_f = $('<p>').text(parsed_json['current_observation']['temp_f']);
        var temperature_string = $('<p>').text("Current Temp: "+parsed_json['current_observation']['temperature_string']);
        var weather = $('<p>').text("Current Observation: "+parsed_json['current_observation']['weather']);
        var rel_humid = $('<p>').text("Humidity: " + parsed_json['current_observation']['relative_humidity']);
        
        var icon_current = $('<img alt = current obs icon>').attr('src', parsed_json['current_observation']['icon_url']);
        var icon_current2 = $('<img>').attr('src', parsed_json.current_observation.icon_url);
        
        var forecast_url = $("<a>").attr('href', parsed_json['current_observation']['forecast_url']);
        forecast_url.attr("title", "wunderground.com");
        forecast_url.attr("target","_blank")
        forecast_url.text("Click here for full forecast");
        forecast_url.addClass("link");

        var futureForecast_icon1 = $('<img class = forecastIcons alt = futureIcon1>').attr('src', parsed_json.forecast.txt_forecast.forecastday[2].icon_url);
        var futureForecast_icon2 = $('<img class = forecastIcons alt = futureIcon2>').attr('src', parsed_json.forecast.txt_forecast.forecastday[4].icon_url);
        var futureForecast_icon3 = $('<img class = forecastIcons alt = futureIcon3>').attr('src', parsed_json.forecast.txt_forecast.forecastday[6].icon_url);

        var futureForecastDiv = $('<div>');
        // futureForecastDiv.append("<h4 class = text-center>"+ "3-Day Outlook" +"</h4>");
        futureForecastDiv.append(futureForecast_icon1);
        futureForecastDiv.append(futureForecast_icon2);
        futureForecastDiv.append(futureForecast_icon3);
        futureForecastDiv.append('<br>');
        futureForecastDiv.append(forecast_url);

        var apiLogo = $('<img>').attr('src', 'https://icons.wxug.com/logos/JPG/wundergroundLogo_4c_horz.jpg');
        apiLogo.addClass("logo");





        console.log(parsed_json);
        console.log("Current temperature in " + location + " is: " + temp_f);

        //Just displaying our options...there's more
        $("#weatherDispl").append(location);
        // $("#weatherDispl").append(locationFull);
        // $("#weatherDispl").append(temp_f);
        $("#weatherDispl").append(temperature_string);
        $("#weatherDispl").append(weather);        
        $("#weatherDispl").append(icon_current);
        $("#weatherDispl").append(rel_humid);
        // $("#weatherDispl").append(icon_current2);
        // $("#weatherDispl").append(forecast_url);
        // $("#weatherDispl").append(futureForecast_icon1);
        $("#weatherDispl").append(futureForecastDiv);

        $("#weatherDispl").append('<br>');
        $("#weatherDispl").append(apiLogo);


      }

      });
    }


        // This function will replace display whatever image it's given in the 'src' attribute
    function displayPhotos(){
        var placeImg =$("<img>");
        placeImg.attr('src', imgUrlArr[count]);
        placeImg.addClass('placeImages')
        $('#google').html(placeImg);
        
    }

    function nextPhoto(){
        count++;

        setTimeout(displayPhotos,2000);
        // cycle through once the last image is shown:
        if (count ===imgUrlArr.length){
            count===1;
        }
    }

    function startSlideshow(){
        showPhoto = setInterval(nextPhoto, 1000);
        
    }


    //new function
    function placePhotos(lat, lng){
        // var photoRef;
        var queryURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + "," + lng + "&radius=5000&key="+key;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response){
            console.log(response);
            // console.log(response.results[0].photos[0].photo_reference);

             for ( var i = 0; i < 11; i++){

                if (response.results[i].photos){

                    var photoRef = response.results[i].photos[0].photo_reference;
                    console.log(photoRef);
            
                    var url = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference='+ photoRef +'&key='+key;
                    console.log(url);
                    imgUrlArr.push(url);
                    console.log(imgUrlArr); 
                    displayPhotos();              
                }
            }
        });
        console.log(imgUrlArr);
        

    }
    

    $(document).on('click', '.placeImages', startSlideshow);



    //Function for individual pages to call
    // Firebase watcher + initial loader 

    // function pageDisplay(){ temporarily making this simply a on(value) event for all pages

        // database.ref('searches').on("value", function(snapshot) {

        //   // storing the snapshot.val() in a variable for convenience
        //   var sv = snapshot.val();
        //   console.log(snapshot.val());
          
        //   // Getting an array of each key In the snapshot object
        //   var svArray = Object.keys(sv);
        //   console.log("svArr:Object.keys(of snapshot): "+svArray);

        //   // Finding the last location's key
        //   var lastIndex = svArray.length - 1;

        //   var lastKey = svArray[lastIndex];

        //   // Using the last location's key to access the last added location object
        //   var lastObj = sv[lastKey]

        //   // Console.loging the last location
        //   console.log(lastObj.Location);

        //  lastSearch = lastObj.Location

        //   //call the weather,maps,placePhotos fxns:
        //   $("#google").empty();
        //   $("#weatherDispl").empty();

        //  console.log(lastSearch);    
        //  codeAddress(lastSearch);
        //  console.log("codeAddress called from on(value)"); 

        //   // Handle the errors
        // }, function(errorObject) {
        //   console.log("Errors handled: " + errorObject.code);
        // });

    // }



    // This function handles addition of new destinations
    $('#submit-location').on('click', function(){
        // Since this has type=submit,we have this line so that users can hit "enter" instead of clicking on the button and it won't move to the next page
        event.preventDefault();

        // This line of code will grab the input from the textbox
        var destination= $("#location-input").val().trim();
        console.log(destination);
        $('#location-input').val(" ");

        //add destination to firebase
        database.ref('searches/').push({
            Location: destination
        });


        // The destination from the input form is then added to our array
        recentSearch.push(destination);
        console.log(recentSearch);
        $("#google").empty();
        $("#weatherDispl").empty();
        
        // Our fxn then runs which handles the processing of the recentSearch array
        codeAddress(destination);

        // not sure this is doing anything here
        return false;
    })

    //child added to database under searches appends button
    //of location added
    database.ref('searches').on('child_added', function(snapshot){
        var value = snapshot.val().Location;
        var button = $("<button>");
        button.text(value);
        button.attr('id', 'recent');//should this be class?
        button.addClass("button transition fill-dark-blue small");

        $("#recent-searches").append(button);
    });

    // on recent searches button click
    $(document).on('click', '#recent', function(){
        var destination = $(this).text();
        $("#google").empty();
        $("#weatherDispl").empty();
        imgUrlArr=["assets/img/loading.gif"];
        codeAddress(destination);
    });


});