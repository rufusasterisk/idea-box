var ideaArray = [];
var id = 1;

$("#save-btn").on('click', function(){
  event.preventDefault();
  var titleInput = $("#title-field").val();
  var bodyInput = $("#body-field").val();
  ideaArray.unshift(new IdeaCard(id, titleInput, bodyInput));
  id++;
})



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
