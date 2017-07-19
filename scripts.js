var ideaArray = [];
var id = 1;

$("#save-btn").on('click', function(){
  event.preventDefault();
  var titleInput = $("#title-field").val();
  var bodyInput = $("#body-field").val();
  //pass Date.now() value as ID
  ideaArray.unshift(new IdeaCard(id, titleInput, bodyInput)); //replace with line below
  //parse ID into local storage
  id++;
  displayCards(ideaArray);//pass single card to function as array
})

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

function upvoteCard(){
  //update card on screen
  //update card in local storage
    //grab ID from card
    //pass ID to update function
}

//event listener in jquery for downvote button

function downvoteCard(){
  //update card on screen
  //update card in local storage
}

//event listener in jquery for delete button

function deleteCard(){
  //remove card from screen
  //remove card from localStorage
}


function buildCard(currentCard){
  var voteText = getQuality(currentCard.quality);
  return `<article class="card">
    <h3>${currentCard.title}</h3>
    <div class="delete-btn"></div>
    <p>${currentCard.body}</p>
    <div class="upvote-btn"></div>
    <div class="downvote-btn"></div>
    <h5>quality: <span>${voteText}</span></h5>
    <hr>
  </article>`
}

function getQuality(qualityNumber){
  if (qualityNumber === 0){
    return 'swill';
  }
  else if (qualityNumber === 1){
    return 'plausible';
  }
  else {
    return 'genius';
  }
}

function IdeaCard(id, title, body) {
  this.id = id;
  this.title = title;
  this.body = body;
  this.quality = 0; //quality ranges from 0-2
  this.upvote = function(){
    this.quality < 2 ? this.quality++ : 0;
  }
  this.downvote = function(){
    this.quality > 0 ? this.quality-- : 0;
  }
}
