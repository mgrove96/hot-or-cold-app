var random, userGuess, alreadyGuessed, userGuesses = [], count, guessHtml, userFeedback;


$(document).ready(function(){
	
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

  	newGame();
  	$('form').on("submit", function(e) {
		e.preventDefault();
		getGuess();
	});

	$('a.new').on('click', newGame);

});


function newGame() {
	$('form').find('input[type=submit]').css('opacity','1');
	count = 0;
	userGuesses = [];
	guessHtml='';
	userGuess = '';
	userFeedback = 'Make your Guess!';
	render();
	setSecretNumber();

	

}

function render(){
	$('#guessList').html(guessHtml);
	$('#count').html(count);
	$('#feedback').html(userFeedback);
}


function getGuess() {
	userGuess = $('form').find('#userGuess').val();
	$('form').find('#userGuess').val('');
	$('form').find('#userGuess').focus();
	if (checkGuessError())
		return ;
	generateFeedback();
	addGuess();
	count++;
	render();

}

function generateFeedback(){
	if(random == userGuess)
	{
		userFeedback = 'You Won. Click new game to play again';
		$('form').find('input[type=submit]').css('opacity','0');
	} 
	else if(Math.abs(random - userGuess) < 10)
	{
		userFeedback = 'hot';
	} 
	else if(Math.abs(random - userGuess) < 20 && Math.abs(random - userGuess) > 9)
	{
		userFeedback = 'Kinda hot';
	} 
	else if(Math.abs(random - userGuess) < 30 && Math.abs(random - userGuess) > 19)
	{
		userFeedback = 'less than warm';
	} 
	else 
	{
		userFeedback = 'cold';
	}
}

function addGuess() {
	userGuesses.push(userGuess);
	guessHtml = '';
	if(userGuesses[0].length) {
		$.each(userGuesses,function(guess,value){
			guessHtml += '<li>' + value + '</li>';
		});
	}
}


function checkGuessError() {
	if (userGuess % 1 !== 0)
	{
		alert("Please input a number");
		return true;
	}
	if (userGuess < 0 || userGuess > 100)
	{
		alert("Please choose a number between 0 and 100");
		return true;
	}
	if (userGuesses.length > 0)
	{
		$.each(userGuesses, function(guess,value){
				if(userGuess == value){
					alreadyGuessed = true;
				}
			});
	}
	if (alreadyGuessed)
	{
		alreadyGuessed = false;
		alert("You already guessed this number");
		return true;
	}
	return false;
}

function setSecretNumber() {
	random = Math.floor((Math.random() * 100) + 1);
}