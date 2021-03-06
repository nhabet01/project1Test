var destination = localStorage.getItem("destination");
var lat = JSON.parse(localStorage.getItem("lat"));
var lng = JSON.parse(localStorage.getItem("lng"));
var dispLoc = localStorage.getItem("dispLoc");
var key = "AIzaSyCq4uYyLv9Msbfrc-tgFhnIKQiZssVr1Dc";



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
    //new function
    function placePhotos(lat, lng){
        // var photoRef;
        var queryURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + "," + lng + "&radius=5000&key="+key;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response){
            console.log(response);
            console.log(response.results[0].photos[0].photo_reference);

             for ( var i = 0; i < 11; i++){

                if (response.results[i].photos){

                    var photoRef = response.results[i].photos[0].photo_reference;
                    console.log(photoRef);
            
                    var url = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference='+ photoRef +'&key='+key;
                    var placeImg =$("<img>");
                    placeImg.attr('src', url);
                    placeImg.addClass('placeImages')
                    $('#google').append(placeImg);

                    console.log(url);
                }

            }

        });

    }
    initMap(lat,lng);
    callWeather(lat,lng);
    placePhotos(lat,lng);