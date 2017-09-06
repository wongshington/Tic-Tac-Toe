class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;

    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {

    this.$el.on('click', 'ul li', (e)=>{
      const currentTarget = $(e.currentTarget);
      this.makeMove(currentTarget);
      if (this.game.currentPlayer === "x") {
        currentTarget.addClass("x");

      } else {
        currentTarget.addClass("o");
      }
    });

    this.$el.on('mouseover','ul li', (e) => {
      $(e.currentTarget).addClass("yellow");
    });

  }



  makeMove($square) {
    let pos = $square.data("pos");
    // console.log(pos);
      try {
        this.game.playMove(pos);
    }
    catch (e) {
      alert(e['msg']);
    }

  if (this.game.isOver()) {
    if(this.game.winner() === null) {
      alert("Tie Game!!");
    }
    else {
     alert(this.game.currentPlayer + " HAS WONNN!!!!");
    }
  }
}

  setupBoard() {
  const $ul = $("<ul>");

    for (let i = 0; i < 9; i++) {
      const y = i % 3;
      let x;
      if (i >= 0 && i <= 2) {
        x =  0;
      }
      else if(i >= 3 && i <= 5) {
        x = 1;
      }
      else {
        x = 2;
      }
      const $li = $("<li>").data("pos", [x, y]);

      $ul.append($li);
    }
    this.$el.append($ul);
  }

}

module.exports = View;
window.View = View;
