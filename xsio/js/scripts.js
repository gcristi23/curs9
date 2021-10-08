var buttons = $('button');

var player = "X";

var clickHandler = (event) => {
    var target = $(event.target);
    target.addClass(player);
    target.html(player);
    player = player === "X" ? "O" : "X";
}

buttons.each( function() {
    $(this).click(clickHandler);
});