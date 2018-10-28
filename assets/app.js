//generating new variables
var funnyAnimals = [];

//Create an event listener on the ID of funny button.
$("button").on("click", function() {
    funnyAnimals = $(this).attr("data-funny")
    //creating a variable and storing our api link or endpoint url.
    var APIkey = "dPEAYWRtQ0hLXqQQWwjObzDQFraBMy93";
    var gifs = $(this).attr("data-funny");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + funnyAnimals + "&api_key=dPEAYWRtQ0hLXqQQWwjObzDQFraBMy93";

    // using ajax (part of jQuery) to make API call.
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    // then passing the data from AJX to a function as a param called response
        .then(function(response) {
            console.log(response);
            //Storing the gif image from the returned object in a var.
            var imageUrl = response.data.images_original_url;
        
            //create a new image tag '<>' and store it in a var
            var results = response.data;
            console.log("funnyAnimals", results);
            console.log(results.length);

            //Create a for loop for new results each time.
            for (var i = 0; i < results.length; i++) {
                //creating a new div and storing with the variable
                var funnyAnimals = $("<div>");

                //Creating a new p tag with the result item's rating on each images
                var p = $("<p>").text ("Rating: " + results[i].rating);
                //Storing the image in a new variable
                var funnyImage = $("<img>");
                // setting the src attribute of the image to a property pulled off the result item
                funnyImage.attr("src", results[i].images.fixed_height.url);
                funnyAnimals.attr("alt", "funny image");

                //then appending the paragraph and image tag to funnyAnimals
                funnyAnimals.append(p);
                funnyAnimals.append(funnyImage);

                //then prepending the funnyAnimal to the HTML page in the "#gifs-appear-here" div
                $("#gifs-appear-here").prepend(funnyAnimals);
                
            }
            
        }) 
        
        $("#buttons-view").text(JSON.stringify(response));

    function renderButtons() {
        $("#button-view").empty();

        for(var i = 0; i < results.length; i++) {
            var a = $("<button>");
            a.addClass("funnyAnimals");
            a.attr("data-funny", results[i]);
            a.text(results[i]);
            $("#button-view").append(a);
        }

        $("#add-gif").on("click", function(event) {
            event.preventDefault();
    
            var funnyAnimals = $("gif-input").val().trim();
    
            results.push(funnyAnimals);
            console.log(results);
    
            renderButtons();
        })

    };
    
    $(document).on("click", ".gifs", renderButtons);

    renderButtons();

    function funnyAnimals() {
        var state = $(this).attr("data-state");
        var position = $(this).attr("data-position"); 
        position = parseInt(position); 
  
        console.log(results[position].images.fixed_height.url);
        console.log(position);
  
        if (state === "still") {
          console.log("we're here");
          $(this).attr("src", results[position].images.fixed_height.url);
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", results[position].images.fixed_height_still.url);
          $(this).attr("data-state", "still");
        }
      };
  
    $(document).on("click", ".image-gifs", funnyAnimals);
  
  });


