  
$(document).ready(function() {
  pageDisplay();

  });




// Kept getting errors with regards to firebase being duplicated/already exists:

  //   var lastSearch="";

  //   var config = {
  //       apiKey: "AIzaSyD0FYqD4sBTgNwR56nFJn4AlS5Y8PKHJw4",
  //       authDomain: "testarea-50aa4.firebaseapp.com",
  //       databaseURL: "https://testarea-50aa4.firebaseio.com",
  //       storageBucket: "testarea-50aa4.appspot.com",
  //       messagingSenderId: "904827425656"
  // };
  // firebase.initializeApp(config);

  //   var database = firebase.database();

  //   // Firebase watcher + initial loader 
  //       database.ref('searches').on("value", function(snapshot) {

  //         // storing the snapshot.val() in a variable for convenience
  //         var sv = snapshot.val();
  //         console.log(snapshot.val());
          
  //         // Getting an array of each key In the snapshot object
  //         var svArray = Object.keys(sv);
  //         console.log("svArr:Object.keys(of snapshot): "+svArray);

  //         // Finding the last location's key
  //         var lastIndex = svArray.length - 1;

  //         var lastKey = svArray[lastIndex];

  //         // Using the last location's key to access the last added location object
  //         var lastObj = sv[lastKey]

  //         // Console.loging the last location
  //         console.log(lastObj.Location);

  //        lastSearch = lastObj.Location

  //         //call the weather,maps,placePhotos fxns:
  //         $("#google").empty();
  //         $("#weatherDispl").empty();

           

  //         // Handle the errors
  //       }, function(errorObject) {
  //         console.log("Errors handled: " + errorObject.code);
  //       });

  //   codeAddress(lastSearch);


