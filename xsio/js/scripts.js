var buttons = $('button');
var resetDiv = $('#reset');
var winnerDiv = $('#winner');
var newGameDiv = $('#new-game');
var playBotCheckbox = $('#play-bot');

var player = "X";
var winner = "DRAW";
var moves;
var playBot = false;



var clickHandler = (event) => {
    if (winner) {
        return;
    }
    var target = $(event.target);
    if (target.html()) {
        return;
    }
    
    if(makeMove(target)) {
        return;
    }

    if(playBot) {
        botMove();
    }
}


var resetGame = () => {
    playBot = playBotCheckbox.is(':checked');
    player="X";
    newGameDiv.hide();
    winnerDiv.html("");
    winner = null;
    moves = 0;
    buttons.each(function() {
        let button = $(this);
        button.removeClass(button.html());
        button.html(""); 
    });
}

var checkWinner = () => {
    var values = buttons.map(
        function () {
            return $(this).html();
        }
    );

    if (values[0] === values[4] && values[4] === values[8] && values[0]) return values[0];
    if (values[2] === values[4] && values[4] === values[6] && values[2]) return values[2];


    for(let i=0; i<3; i++) {
        if (values[i] === values[i+3] && values[i+3] === values[i+6] && values[i]) return values[i];
        if (values[i*3] === values[i*3+1] && values[i*3+1] === values[i*3+2] && values[i*3]) return values[i*3];
    }

    if (moves === 9) return "DRAW";

}

var botMove = () => {
    var move = Math.floor(Math.random()*9);
    var botButton = $(buttons[move]);
    
    while(botButton.html()) {
        move = Math.floor(Math.random()*9);
        botButton = $(buttons[move]);
    }

    if(makeMove(botButton)) {
        return;
    }
}

var makeMove = (button) => {
    moves++;
    button.addClass(player);
    button.html(player);
    winner = checkWinner();
    if(winner) {
        winnerDiv.html("Winner: "+winner);
        newGameDiv.show();
        return true;
    }
    player = player === "X" ? "O" : "X";
}

resetDiv.click(resetGame);

buttons.each(function (index, element) {
    //$(element).html(index);
    $(element).click(clickHandler);
});