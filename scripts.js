displayCards(getCardsFromStorage());
$("#search-field").on('input', cardSearch);
$(".idea-section").on('click', '.upvote-btn', upvoteCard);
$(".idea-section").on('click', '.downvote-btn', downvoteCard);
$(".idea-section").on('click', '.delete-btn', deleteCard);
$(".idea-section").on('blur', 'h3, p', updateCardText);
$(".idea-section").on('keydown', 'h3, p', function(){
  if (event.which == 13 ){
    $("#search-field").focus();
  }
})

$("#save-btn").on('click', function(){
  event.preventDefault();
  var titleInput = $("#title-field").val();
  var bodyInput = $("#body-field").val();
  var id = Date.now();
  var newCard = new IdeaCard(id, titleInput, bodyInput);
  setCard(newCard);
  displayCards(getCardsFromStorage());
  clearTextField();
})

function cardSearch(){
  var searchString = $(this).val().toLowerCase();
  var searchArray = getCardsFromStorage();
  var filteredArray = searchArray.filter(function(card){
    return (card.title.toLowerCase().includes(searchString) || card.body.toLowerCase().includes(searchString));
  })
  displayCards(filteredArray);
}

function updateCardText(event){
  var cardKey = $(event.target).parent().data("storageId");
  var updatedTitle = $(event.target).parent().find("h3").text();
  var updatedBody = $(event.target).parent().find("p").text();
  var currentCard = getCard(cardKey);
  currentCard.title = updatedTitle;
  currentCard.body = updatedBody;
  setCard(currentCard);
}

function getCardsFromStorage(){
  var cardArray = [];
  for (var i = 0; i < localStorage.length; i++){
    var currentKey = localStorage.key(i);
    cardArray.push(JSON.parse(localStorage.getItem(currentKey)));
  }
  cardArray.sort(function(a, b){
    return b.id - a.id;
  });
  return cardArray;
}

function displayCards(displayArray){
  $('.card-div').empty()
  for (i = 0; i < displayArray.length; i++){
    var cardHTML = buildCard(displayArray[i]);
    insertCard(cardHTML);
  }
}

function clearTextField(){
  $("#title-field").val("");
  $("#body-field").val("");
}

function insertCard(cardHTML){
  $(".card-div").append(cardHTML);
}

function upvoteCard(clickedCard){
  var cardKey = $(this).parent().data("storageId");
  var currentSpan = $(this).parent().find('span');
  if (currentSpan.text() === "swill"){
    currentSpan.text("plausible");
    var currentCard = getCard(cardKey);
    currentCard.quality = "plausible";
    setCard(currentCard);
  }
  else if (currentSpan.text() === "plausible"){
    currentSpan.text("genius");
    var currentCard = getCard(cardKey);
    currentCard.quality = "genius";
    setCard(currentCard);
  }
}

function setCard(aCard){
    localStorage.setItem(aCard.id, JSON.stringify(aCard));
}

function getCard(storageKey) {
    return JSON.parse(localStorage.getItem(storageKey));
}

function downvoteCard(){
  var cardKey = $(this).parent().data("storageId");
  var currentSpan = $(this).parent().find('span');
  if (currentSpan.text() === "genius"){
    currentSpan.text("plausible");
    var currentCard = getCard(cardKey);
    currentCard.quality = "plausible";
    setCard(currentCard);
  }
  else if (currentSpan.text() === "plausible"){
    currentSpan.text("swill");
    var currentCard = getCard(cardKey);
    currentCard.quality = "swill";
    setCard(currentCard);
  }
}

function deleteCard(){
  var cardKey = $(this).parent().data("storageId");
  localStorage.removeItem(cardKey);
  $(this).parent().remove();
}

function buildCard(currentCard){
  return `<article class="card" data-storage-id="${currentCard.id}">
    <h3 contenteditable="true">${currentCard.title}</h3>
    <div class="delete-btn"></div>
    <p contenteditable="true">${currentCard.body}</p>
    <div class="upvote-btn"></div>
    <div class="downvote-btn"></div>
    <h5>quality: <span>${currentCard.quality}</span></h5>
    <hr>
  </article>`
}

function IdeaCard(id, title, body) {
  this.id = id;
  this.title = title;
  this.body = body;
  this.quality = "swill";
}
