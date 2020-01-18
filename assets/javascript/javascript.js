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
    console.log("YORU IN THE MAKE API CALL FUNCITON")
    console.log(queryURL)
// api call for recipes based on ingredients
var settings = {
	"url": queryURL,
	"method": "GET",
}
// https://api.edamam.com/search?q=chicken&app_id=e7e14c99&app_key=8b305785d6e489018ccfd57f33064460

$.ajax(settings).done(function (response) {
    console.log(response);
    apiURL = response.hits[0].recipe.url
    // my code
    newDiv = $("<div>");
    a = $("<a>");
    a.html(`<a href=${apiURL}> Click here for recipe! </a>`)
    a.attr("class", "r-link")
    newDiv.append(a);
    $(".results").html(newDiv);
    //  ======= can try and see if you guys can include that a tag
    newDiv = $("<div>");
    // newDiv.append(response.hits[0].recipe.url);
    console.log(response.hits[0].recipe.url);

    $(".results").append();
});
}