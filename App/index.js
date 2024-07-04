let reviewArray = [];
let avgScore = 0.0;
let selectedStar = 0;

//save the review array to local storage
function saveToLocalStorage(){
    const reviewListString = JSON.stringify(reviewArray);
    localStorage.setItem('reviewList',reviewListString);
}

//loads the reviews from local storage
function loadFromLocalStorage(){
    const reviewListString = localStorage.getItem('reviewList');
    const reviewList = JSON.parse(reviewListString);
    return reviewList ?? [];
}



function renderReviews() {
    //set the appropiate star behavior
    const stars = document.getElementsByClassName("stars");
    setStars(selectedStar,stars);

    document.addEventListener("mouseover", (event) => {
        if (event.target.className == "stars"){
            const starIndex = event.target.dataset.id - 1;

            stars[starIndex].src = "star_full.png";
            for (let j = 0; j < starIndex; j++){
                stars[j].src = "star_full.png"
            }
        }
    });

    document.addEventListener("mouseout", (event) => {
        if (event.target.className == "stars"){
            const starIndex = event.target.dataset.id - 1;

            if (starIndex > selectedStar){
                stars[starIndex].src = "star_empty.png";
                for (let j = 0; j < starIndex; j++){
                    if (j > selectedStar){
                        stars[j].src = "star_empty.png"
                    }
                }
            }
        }
    });

    document.addEventListener("click", (event) => {
        if (event.target.className == "stars"){
            setStars(event.target.dataset.id - 1,stars);
        }
    });

    reviewArray = loadFromLocalStorage();
    //initial render when booting up the app, displays all the reviews from the array
    for (review of reviewArray){
        createReview(review);
    }
}

function addReview() {
    //get the textarea and the input elements
    const reviewInputText = document.getElementById("review-input");
    const stars = document.getElementsByClassName("stars");

    //if the input was wrong, to reset the border when the input is correct
    reviewInputText.oninput = () => {
        reviewInputText.className = "";
    }

    //give a red border as warning that the input is wrong
    if (reviewInputText.value == ""){
        reviewInputText.className = "is-wrong";
        return;
    } else {
        reviewInputText.className = "";
    }

    //create the object
    const review = {
        reviewText: reviewInputText.value,
        score: selectedStar + 1 
    }

    //pushing our object into the array
    reviewArray.push(review);

    //saving our review list to local storage
    saveToLocalStorage();

    //creating the element for the review
    createReview(review);

    //reset the inputs to be blank
    reviewInputText.value = "";
    setStars(0,stars);
}

function createReview(review) {
    //update the average score
    calculateAvgScore();

    //creating our elements
    const reviewElement = document.createElement("div");
    const reviewText = document.createElement("span");
    const reviewScore = document.createElement("div");
    const deleteButton = document.createElement("button");
    
    //give our div the proper styling
    reviewElement.className = "review-element";

    //writing the text of the review
    reviewText.innerText = review.reviewText;
    reviewElement.appendChild(reviewText);

    //writing the score of the review
    reviewScore.className = "starContainer";
    for (let i = 0; i < 5; i++){
        const starElement = document.createElement("img");
        starElement.className = "stars-constant";
        if (i < review.score){
            starElement.src = "star_full.png";
        } else {
            starElement.src = "star_empty.png";
        }
        reviewScore.appendChild(starElement);
    }
    reviewElement.appendChild(reviewScore);

    //creating the delete button
    deleteButton.innerText = "Remove";
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

//set how many stars are selected for the review
function setStars(index,stars){
    selectedStar = index;
    for (star of stars){
        star.src = "star_empty.png";
    }
    for (let i = 0; i <= index; i++){
        stars[i].src = "star_full.png";
    }
}

renderReviews()