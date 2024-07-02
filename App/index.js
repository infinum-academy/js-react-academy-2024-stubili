let reviewArray = [];
let avgScore = 0.0;

//save the review array to local storage
function saveToLocalStorage(){
    const reviewListString = JSON.stringify(reviewArray);
    localStorage.setItem('reviewList',reviewListString);
}

//loads the reviews from local storage
function loadFromLocalStorage(){
    const reviewListString = localStorage.getItem('reviewList');
    const reviewList = JSON.parse(reviewListString);
    return reviewList;
}

function renderReviews() {
    reviewArray = loadFromLocalStorage();
    //initial render when booting up the app, displays all the reviews from the array
    for (review of reviewArray){
        createReview(review);
    }
}

function addReview() {
    //get the textarea and the input elements
    const reviewInputText = document.getElementsByTagName("textarea");
    const reviewInputScore = document.getElementsByTagName("input");

    //if the input was wrong, to reset the border when the input is correct
    reviewInputText[0].oninput = () => {
        reviewInputText[0].className = "";
    }

    reviewInputScore[0].oninput = () => {
        reviewInputScore[0].className = "";
    }

    //give a red border as warning that the input is wrong
    if (reviewInputText[0].value == ""){
        reviewInputText[0].className = "is-wrong";
    } else {
        reviewInputText[0].className = "";
    }

    if (reviewInputScore[0].value == "" || reviewInputScore[0].value < 1 || reviewInputScore[0].value > 5){
        reviewInputScore[0].className = "is-wrong";
    } else {
        reviewInputScore[0].className = "";
    }

    //if either of the inputs is wrong, clicking the button does nothing
    if (reviewInputText[0].value == "" || reviewInputScore[0].value == "" || reviewInputScore[0].value < 1 || reviewInputScore[0].value > 5     ) {
        return 0;
    }

    //create the object
    const review = {
        reviewText: reviewInputText[0].value,
            score: reviewInputScore[0].value
    }

    //pushing our object into the array
    reviewArray.push(review);

    //saving our review list to local storage
    saveToLocalStorage();

    //creating the element for the review
    createReview(review);

    //reset the inputs to be blank
    reviewInputText[0].value = "";
    reviewInputScore[0].value = "";
}

function createReview(review) {
    //update the average score
    calculateAvgScore();

    //creating our elements
    const reviewElement = document.createElement("div");
    const reviewText = document.createElement("span");
    const reviewScore = document.createElement("p");
    const deleteButton = document.createElement("button");
    
    //give our div the proper styling
    reviewElement.className = "review-element";

    //writing the text of the review
    reviewText.innerHTML = review.reviewText;
    reviewElement.appendChild(reviewText);

    //writing the score of the review
    reviewScore.innerHTML = review.score + "/5";
    reviewElement.appendChild(reviewScore);

    //creating the delete button
    deleteButton.innerHTML = "Remove";
    deleteButton.onclick = () => {
        deleteReview(review,reviewElement)
    };
    reviewElement.appendChild(deleteButton);

    //putting our review in the proper div
    const reviewDiv = document.getElementById("reviews");
    reviewDiv.appendChild(reviewElement);
}

//deletes the review and updates the score
function deleteReview(review,reviewElement) {
    reviewElement.remove();
    reviewArray = reviewArray.filter((r) => {
        return r !== review;
    });
    calculateAvgScore();
    saveToLocalStorage();
}

//calculates the average score of the movie from all the reviews
function calculateAvgScore(){
    if (reviewArray.length == 0){
        document.getElementById("score").innerHTML = "0.0 / 5";
        return;
    }
    let sum = 0;
    for (review of reviewArray){
        sum += parseInt(review.score);
    }
    avgScore = sum / reviewArray.length;
    document.getElementById("score").innerHTML = avgScore.toFixed(1) + " / 5";
}

renderReviews()