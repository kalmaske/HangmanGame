
//GLOBAL VARIABLES

//keyboard to track how many time a letter was pressed
var keyboard = ['a','b','c',
                  'd','e','f',
                  'g','h','i',
                  'j','k','l',
                  'm','n','o',
                  'p','q','r',
                  's','t','u',
                  'v','w','x',
                  'y','z'];
// array of word for the game 
var wordBank =['amsterdam',
               'bahrain',
               'canada',
               'fiji',
               'finland',
               'germany',
               'italy',
               'madagascar',
               'portugal',
               'philippines',
               'switzerland',
               'venezuela',
               'mozambique',
               'australia',
               'dubai',
               'lebanon',
               'indonesia',
               'ireland',
               'france',
               'greece',
               'indonesia',
               'jamaica',
               'jordan',
               'korea',
               'mexico',
               'mongolia',
               'mali',
               'nepal',
               'norway',
               'oman',
               'peru',
               'qatar'
              ];
//random word
var chosenRandomWord = "";
//how many letters are there in the word
var lettersInWord = [];
//how many number of blanks in the word
var blanks = 0;
//blanks and sright guesses
var blanksNRightGuesses =[];
//Wrong guesses
var wrongLetters = [];
//Counters
var winCount = 0;
var loseCount = 0;
var NumberOfGuesses = 10;
var rightGuessCounter = 0;




//FUNCTIONS

function reset()
{
    //Choses random from wordBank
    chosenRandomWord = wordBank[Math.floor(Math.random() * wordBank.length)];
    //Splits chooen word into individual letters
    lettersInWord = chosenRandomWord.split('');
    //get number of blanks to print
    blanks = lettersInWord.length;
    
    //RESET
    letterGuessed = 0;
    rightGuessCounter = 0;
    NumberOfGuesses = 9;
    wrongLetters =[];
    blanksNRightGuesses =[];
    keyboard = ['a','b','c',
                      'd','e','f',
                      'g','h','i',
                      'j','k','l',
                      'm','n','o',
                      'p','q','r',
                      's','t','u',
                      'v','w','x',
                      'y','z'];
    test=false;
    beginGame();
}
function beginGame()
{
    //Chooses word randombly from the wordBank
    chosenRandomWord = wordBank[Math.floor(Math.random() * wordBank.length)];
    //Splits the choosen word into individual letters
    lettersInWord = chosenRandomWord.split('');
    //Get the number of blanks
    blanks = lettersInWord.length;
    
    //RESET
    rightGuessCounter = 0;
    NumberOfGuesses = 10;
    wrongLetters =[];
    blanksNRightGuesses =[];
    keyboard = ['a','b','c',
                      'd','e','f',
                      'g','h','i',
                      'j','k','l',
                      'm','n','o',
                      'p','q','r',
                      's','t','u',
                      'v','w','x',
                      'y','z'];

    for(var i = 0; i< blanks; i++)
    {
        blanksNRightGuesses.push('_');
        document.getElementById('wordToGuess').innerHTML = blanksNRightGuesses;
    }

    document.getElementById('wordToGuess').innerHTML = blanksNRightGuesses.join(' ');
    document.getElementById('numGuesses').innerHTML = NumberOfGuesses;
    document.getElementById('winCounter').innerHTML = winCount;
    document.getElementById('lossCounter').innerHTML = loseCount;
    document.getElementById('wrongGuesses').innerHTML = wrongLetters;
    console.log(chosenRandomWord);
    console.log(lettersInWord);
    console.log(blanks);
    console.log(blanksNRightGuesses);
}

function compareLetters(userKey)
{
                console.log('WORKING!');
                if(chosenRandomWord.indexOf(userKey) > -1)
                {
                    for(var i = 0; i < blanks; i++)
                    {
                        if(lettersInWord[i] === userKey)
                        {

                            rightGuessCounter++;
                            blanksNRightGuesses[i] = userKey;
                            document.getElementById('wordToGuess').innerHTML = blanksNRightGuesses.join(' ');
                        }   
                    }
                    console.log(blanksNRightGuesses);
                }
                else
                {
                    wrongLetters.push(userKey);
                    NumberOfGuesses--;
                    document.getElementById('numGuesses').innerHTML = NumberOfGuesses;
                    document.getElementById('wrongGuesses').innerHTML = wrongLetters;
                    console.log('Wrong Letters = ' + wrongLetters);
                    console.log('Guesses left are ' + NumberOfGuesses);
                }
            
            
        
}
function winLose()
{
    // When number blanks is filled with right letters  you win
    if(rightGuessCounter === blanks)
    {
        //Counts Wins 
        winCount++;
        document.getElementById('winCounter').innerHTML = winCount;
        var audio = new Audio('assets/sounds/gameWon.mp3');
        audio.play();
        alert('You Win');
        reset();
    }
    // When number of Guesses is 0  You lose
    else if(NumberOfGuesses === 0)
    {
        //Counts losses
        loseCount++;
        document.getElementById('lossCounter').innerHTML = loseCount;
         var audio = new Audio('assets/sounds/gameLost.mp3');
        audio.play();
        alert('You Lose');
        reset();
    }
}

//MAIN PROCCESS

//Initiates  Code
beginGame();

document.onkeyup = function(event)
{
    test = true;
    var letterGuessed = event.key;
    for(var i = 0; i < keyboard.length; i++)
    {   
        if(letterGuessed === keyboard[i] && test === true)
        {
            var spliceDword = keyboard.splice(i,1);
            //Test / Debug
            console.log('Double word is = ' + keyboard[i])
            console.log('Spliced Word is = ' + spliceDword);

            compareLetters(letterGuessed);
            winLose();
        }
    }       
        
}
