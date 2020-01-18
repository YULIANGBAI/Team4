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
    console.log(response);
    foodTitle = response.hits[0].recipe.label;
    apiURL = response.hits[0].recipe.url;
    newDiv = $("<div>");
    newDiv.html(`<a href=${apiURL}>${foodTitle}</a>`);
    $(".results").html(newDiv);

    var image = $("<img>");
    image.attr("src", response.hits[0].recipe.image);
    $(".results").append(image)
});
}      