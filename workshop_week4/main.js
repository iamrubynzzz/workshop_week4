//declaring variables
const movieTitleElement = document.getElementById("movieTitle");
const ratingElement = document.getElementById("rating");
const movieInputElement = document.getElementById("movieInput");
const getInfoBtn = document.getElementById("getInfoBtn");
const errorMsgElement = document.createElement("p");

//adding click event listener to the "get info" button
getInfoBtn.addEventListener("click", () => {
    const title = movieInputElement.value.trim();
    if (title === "") {
        displayErrorMessage("Please enter a movie title.");  // if the input field is empty, display error message
        return;
    }

    //create API ur and API key
    const apiKey = "b4cdfba7";
    const url = `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${apiKey}`;

    //fetch movie data from the API
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if (data.Response === "False") {
                displayErrorMessage(data.Error); //display error message if the API response is an error
                return;
            }

            displayMovieInformation(data);  //display movie information
        })
        .catch((error) => {
            displayErrorMessage("An error occurred. Please try again later.");  //display error message if the error occoured during fetch
        });
});

//display movie information
function displayMovieInformation(data) {
    errorMsgElement.textContent = "";
    movieTitleElement.innerHTML = `Title: <b>${data.Title}</b>`;
    ratingElement.innerHTML = `IMDB Rating: ${data.imdbRating}<br>Release Year: ${data.Year}<br>Director: ${data.Director}<br><img src="${data.Poster}">`;
}
function displayErrorMessage(message) {   //display error message
    movieTitleElement.textContent = "";
    ratingElement.textContent = "";
    errorMsgElement.textContent = message;
    errorMsgElement.id = "errorMsg";
    document.getElementById("container").appendChild(errorMsgElement);
}
