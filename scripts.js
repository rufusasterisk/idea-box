
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
