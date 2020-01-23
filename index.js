// global varibles to be used
var queryURL;

// button to submit
$("#submitButton").on("click",function(event){
    event.preventDefault();
    userSearch = $("#ingredient").val();
    appId = "e7e14c99"
    appKey = "8b305785d6e489018ccfd57f33064460"
    queryURL = `https://api.edamam.com/search?q=${userSearch}&app_id=${appId}&app_key=${appKey}`;
    makeAPICall(queryURL)
});

var makeAPICall= function(queryURL){
    // api call for recipes based on ingredients
    var settings = {

        "url": queryURL,
        "method": "GET",
        
    }
    // https://api.edamam.com/search?q=chicken&app_id=e7e14c99&app_key=8b305785d6e489018ccfd57f33064460

    $.ajax(settings).done(function (response) {
        var recipeNums = [];

        for (var i = 0; i < 4; i++) {
            var rNum = -1;
            
            while(rNum === -1) {
                var tempNum = Math.floor(Math.random() * 10);

                if(!recipeNums.includes(tempNum)) {
                    rNum = tempNum;
                    recipeNums.push(tempNum);
                }
            }

            foodTitle = response.hits[rNum].recipe.label;
            apiURL = response.hits[rNum].recipe.url;

            newDiv = $("<div>");
            newDiv.html(`<a href=${apiURL}>` + foodTitle + '</a>');
            var image = $("<img>");
            image.attr("src", response.hits[rNum].recipe.image);
            newDiv.append(image);
            $(".results").append(newDiv);
            console.log(recipeNums);
        };
        
    });
}