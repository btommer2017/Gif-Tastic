 // Initial array of animals and others
 var animalList = ["cat", "dog", "elephant", "naked mole rat", "squirrel", "lemur", "sloth",
     "manatee", "bear cub", "chameleon", "pac-man", "south park", "he-man", "disney", "cartoons"
 ];

 // Function for displaying aniaml data
 function renderButtons() {

     // Deleting buttons prior to adding new ones, necessary or will be repeats
     $("#buttons-view").empty();
     // Looping through the array of movies
     for (var i = 0; i < animalList.length; i++) {

         //create a new button
         var a = $("<button>")
             .addClass("animal-btn")
             .attr("data-animal", animalList[i])
             .text(animalList[i]);
         //adds user created button
         $("#buttons-view").append(a);
     }
 }
 renderButtons();
//default number of gifs that will populate the page
 userButtonNumber = 10
 $("#userInputNumberOfGifs").on("click", function (event) {
     event.preventDefault();
     userButtonNumber = $("#userNumber-input").val().trim();
     $("#userQuery").text("Number of Gifs: " + userButtonNumber);
 })

 $("#add-animal").on("click", function (event) {
     //stop page from refreshing and losing all input
     event.preventDefault();
     // This line grabs the input from the textbox
     var animal = $("#animal-input").val().trim();
     // Adding animal from the textbox to our array
     animalList.push(animal);
     $("animal-input").val("");
     // Calling renderButtons which handles the processing of our animal array
     renderButtons();
 });

 $(document.body).on('click', "button", function () {

     var URL = "https://api.giphy.com/v1/gifs/search?q="
     var animal = $(this).attr("data-animal");
     var apiKey = "&api_key=2XQxSqpq9wORLPZdYVPVNtGDsssIVFVr&limit=";
     // Constructing a URL to search Giphy, instead of one line, code is broken down into variables
     // var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=2XQxSqpq9wORLPZdYVPVNtGDsssIVFVr&limit=10";
     var queryURL = URL + animal + apiKey + userButtonNumber

     // Performing our AJAX GET request
     $.ajax({
             url: queryURL,
             method: "GET"
         })
         // After the data comes back from the API
         .then(function (response) {
             console.log(response.data);

             // Storing an array of results in the results variable
             var results = response.data;
             console.log(results);

             //adding a counter to display the number under each gif
             totalGifNumber = userButtonNumber;

             // Looping over every result item
             for (var i = 0; i < results.length; i++) {

                 // Only taking action if the photo has an appropriate rating
                 if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                     // Creating a div with the class "item"
                     var gifDiv = $("<div class='item'>");

                     // Storing the result item's rating
                     var rating = results[i].rating;

                     // Creating a paragraph tag with the result item's rating
                     var p = $("<p>").text("#" + [totalGifNumber--] + " " + "Rating: " + rating);

                     // Creating an image tag
                     var gifImage = $("<img>")

                     //add variables to hold the values of the still and animated images
                     var stillImage = results[i].images.fixed_height_still.url;
                     var animatedImage = results[i].images.fixed_height.url;

                     //add attributes to the images to be able to add a pause/play effect
                     gifImage.attr("src", animatedImage);
                     gifImage.attr("data-still", stillImage);
                     gifImage.attr("data-animate", animatedImage);
                     gifImage.attr("data-state", "animate");

                     // populating the page with the number of gif images, default is 10 but user can change this
                     gifDiv.prepend(gifImage);
                     // Appending the paragraph and gifImage to the "gifDiv" div 
                     gifDiv.append(p);

                     $("#animal-gifs-view").prepend(gifDiv);

                 }
             }
         });
 });
 // click function to pause and play gifs
 $(document).on('click', 'img', function () {
     var state = $(this).attr('data-state');
     console.log(this);
     console.log(state);
     if (state === "still") {
         $(this).attr("src", $(this).attr("data-animate"));
         $(this).attr("data-state", "animate");
     } else {
         $(this).attr("src", $(this).attr("data-still"));
         $(this).attr("data-state", "still");

     }
 })