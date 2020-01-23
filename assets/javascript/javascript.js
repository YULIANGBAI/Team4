// global varibles to be used
var queryURL;
var ingredArray = [];

$("#addButton").on("click",function(event){
    event.preventDefault();
    userSearch = $("#ingredient").val();
    if(ingredArray.includes(userSearch)){
        alert("This is already included!")
    } else {
        ingredArray.push(userSearch);
    }
    $(".addedIngredients").text(ingredArray);
    
})
// button to submit
$("#submitButton").on("click",function(event){
    event.preventDefault();
    tempStr = ingredArray.toString();
    tempStr = tempStr.replace(",","+");
    // console.log(tempStr)
    appId = "e7e14c99"
    appKey = "8b305785d6e489018ccfd57f33064460"
    queryURL = `https://api.edamam.com/search?q=${tempStr}&app_id=${appId}&app_key=${appKey}`;
    makeAPICall(queryURL)
});

var makeAPICall= function(queryURL){
// api call for recipes based on ingredients
var settings = {
	"url": queryURL,
	"method": "GET",
}
// https://api.edamam.com/search?q=chicken+apple+pear&app_id=e7e14c99&app_key=8b305785d6e489018ccfd57f33064460

    $.ajax(settings).done(function (response) {
        var recipeNums = [];

        for (var i = 0; i < 4; i++) {
            var rNum = -1;
            
            while(rNum === -1) {
                var tempNum = Math.floor(Math.random() * 9);

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