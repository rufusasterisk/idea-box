displayCards(getCardsFromStorage());
// var upVote = document.querySelector(".upvote-btn")
// var downVote = document.querySelector(".downvote-btn")
// var deleteButton = document.querySelector(".delete-btn")

// these are the listeners couldnt figure out how to make them count up and down or get the delete to work right
// upVote.addEventListener("click", function(){
//     console.log(getQuality())
// });


// downVote.addEventListener("click", upvoteCard);

// deleteButton.addEventListener("click", function(event){
//     event.preventDefault()
//     console.log("click delete");
//     // var  card = document.querySelector(".card");
//     // card.parentNode.removeChild(card);
//     // return false;
//     });
$("#save-btn").on('click', function(){
  event.preventDefault();
  var titleInput = $("#title-field").val();
  var bodyInput = $("#body-field").val();
  //pass Date.now() value as ID
  var id = Date.now();
  // ideaArray.unshift(new IdeaCard(id, titleInput, bodyInput)); //replace with line below
  var newCard = new IdeaCard(id, titleInput, bodyInput);
  localStorage.setItem(newCard.id, JSON.stringify(newCard));
  //parse ID into local storage
  // id++;
  displayCards(getCardsFromStorage());//pass single card to function as array
})
function getCardsFromStorage(){
  var cardArray = [];
  for (var i = 0; i < localStorage.length; i++){
    var currentKey = localStorage.key(i);
    cardArray.push(JSON.parse(localStorage.getItem(currentKey)));
  }
  return cardArray;
}

function displayCards(displayArray){
  $('.card-div').empty()
  for (i = 0; i < displayArray.length; i++){
    var cardHTML = buildCard(displayArray[i]);
    insertCard(cardHTML);
  }
}

function insertCard(cardHTML){
  $(".card-div").append(cardHTML);
}

//event listener in jquery to for upvote button
$(".idea-section").on('click', '.upvote-btn', upvoteCard)

function upvoteCard(clickedCard){
  //update card on screen
  var cardKey = $(this).parent().data("storageId");
  var currentSpan = $(this).parent().find('span');
  if (currentSpan.text() === "swill"){
    currentSpan.text("plausible");
    var currentCard = getCard(cardKey);
    currentCard.quality = "plausible";
    setCard(currentCard);



    //update local storage with new card quality
  }
  else if (currentSpan.text() === "plausible"){
    currentSpan.text("genius");
    var currentCard = getCard(cardKey);
    currentCard.quality = "genius";
    setCard(currentCard);
    //update local storage with new card quality
  }
}
function setCard(aCard){
    localStorage.setItem(aCard.id, JSON.stringify(aCard));
}
function getCard(storageKey) {
    return JSON.parse(localStorage.getItem(storageKey));
}
//event listener in jquery for downvote button
$(".idea-section").on('click', '.downvote-btn', downvoteCard);

function downvoteCard(){
  //update card on screen
  var cardKey = $(this).parent().data("storageId");
  var currentSpan = $(this).parent().find('span');
  if (currentSpan.text() === "genius"){
    currentSpan.text("plausible");
    var currentCard = getCard(cardKey);
    currentCard.quality = "plausible";
    setCard(currentCard);
    //update local storage with new card quality
  }
  else if (currentSpan.text() === "plausible"){
    currentSpan.text("swill");
    var currentCard = getCard(cardKey);
    currentCard.quality = "swill";
    setCard(currentCard);
    //update local storage with the new card quality
  }
}

//event listener in jquery for delete button
$(".idea-section").on('click', '.delete-btn', deleteCard);

function deleteCard(){
  var cardKey = $(this).parent().data("storageId");
  localStorage.removeItem(cardKey);
  //remove card from screen
  $(this).parent().remove();
  //remove card from localStorage
}


function buildCard(currentCard){
  // var voteText = getQuality(currentCard.quality);
  return `<article class="card" data-storage-id="${currentCard.id}">
    <h3>${currentCard.title}</h3>
    <div class="delete-btn"></div>
    <p>${currentCard.body}</p>
    <div class="upvote-btn"></div>
    <div class="downvote-btn"></div>
    <h5>quality: <span>${currentCard.quality}</span></h5>
    <hr>
  </article>`
}

// function getQuality(qualityNumber){
//   if (qualityNumber === 0){
//     return 'swill';
//   }
//   else if (qualityNumber === 1){
//     return 'plausible';
//   }
//   else {
//     return 'genius';
//   }
// }

function IdeaCard(id, title, body) {
  this.id = id;
  this.title = title;
  this.body = body;
  this.quality = "swill"; //quality ranges from 0-2
  // this.upvote = function(){
  //   this.quality < 2 ? this.quality++ : 0;
  // }
  // this.downvote = function(){
  //   this.quality > 0 ? this.quality-- : 0;
  // }
}
