$(document).ready(() => {
    "use strict";
    let deck = $('.deck');
    let openedCards = [];
    /*
 * Create a list that holds all of your cards
 */
    let cardsList = ['diamond', 'paper-plane-o', 'anchor', 'bolt', 'cube', 'leaf', 'bicycle', 'bomb', 'diamond', 'paper-plane-o', 'anchor', 'bolt', 'cube', 'leaf', 'bicycle', 'bomb'];

    /*
     * Display the cards on the page
     *   - shuffle the list of cards using the provided "shuffle" method below
     *   - loop through each card and create its HTML
     *   - add each card's HTML to the page
     */
    function init(cards) {
        cards = shuffle(cards);
        // shuffle all the cards ...
        const deck = $('.deck');
        deck.empty(); // empty all the html in deck
        // create html for cards
        let temp = '';
        for (let i = 0; i < cards.length; i++) {
            temp += `<li class="card" data-name="${cards[i]}"><i class="fa fa-${cards[i]}"></i></li>`;
        }
        deck.html(temp);
        // show all the cards for 4 seconds
        deck.find('li').addClass('open show');
        // set the counter to 0
        $('.moves').text('0');
        setTimeout(() => {
            deck.find('li').removeClass('open show');
            clickCard();
        }, 3900);

    }

// Shuffle function from http://stackoverflow.com/a/2450976


    function shuffle(array) {
        let currentIndex = array.length, temporaryValue, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    init(cardsList);

//* set up the event listener for a card. If a card is clicked:
    function clickCard() {
        deck.on('click', '.card', cardlogic);
    }

    // set up event listener for restart button
    $('.restart').click(restart);

    function cardlogic() {

        // check for first time clicking
        if (!openedCards.length) {
            if (sameCardIsClicked.call(this)) {
                swal("Oops.....", "Please Click A Different Card", "info");
            }
            showcard.call(this);
            addcard.call(this);
        }

        else if (openedCards.length === 1) {

            if (sameCardIsClicked.call(this)) {
                swal("Oops.....", "Please Click A Different Card", "info");
            }
            else {
                comparecards.call(this);
                checkForWinningTheGame();

            }

        }

    }

    function showcard() {
        $(this).addClass('open show');
    }

    function addcard() {
        openedCards.push($(this).index());
        console.log(openedCards);

    }

    function comparecards() {
        // check if cards match
        const clicked = $(this);
        const elementToCompare = $('.deck li').get(openedCards[0]);
        console.log(elementToCompare);
        incrementCounter();
        // checking if cards data-name attribute matches
        if (clicked.attr('data-name') === $(elementToCompare).attr('data-name')) {
            matchcards(clicked, elementToCompare); // call the matchCards function to show clicked cards and add animation
            clearOpenArray(openedCards); // clear the openCards array for more clicking to be done
        }
        else {
            // if cards do not match then hide the clicked card with some animation
            hideCards(clicked, elementToCompare);
        }
    }

    function matchcards(clicked, elemToCompare) {
        clicked.addClass('open show match grow'); // animation effects
        $(elemToCompare).addClass('open show match grow');
        setTimeout(() => {
            clicked.removeClass('grow');
            $(elemToCompare).removeClass('grow');
        }, 800); // remove the red background color ..
    }

    function sameCardIsClicked() {
        return $(this).hasClass('open');
    }

    function hideCards(clicked, elementToCompare) {
        clicked.addClass('swing show bg-notMatch');
        $(elementToCompare).addClass('swing bg-notMatch');
        setTimeout(() => {
            clicked.removeClass('swing show bg-notMatch');
            $(elementToCompare).removeClass('swing bg-notMatch show open')
        }, 820);
        // clear the open cards array index for new card matching
        clearOpenArray(openedCards);
    }

    function clearOpenArray(array) {
        array.shift();
    }

    function incrementCounter() {
        const counter = $('.moves');
        counter.text(+counter.text() + 1);
        const stars = $('.stars');

        function makestars(stars) {
            let templi = "";
            for (let i = 0; i < stars; i++) {
                templi += "<li><i class=\"fa fa-star\"></i></li>"
            }
            return templi;
        }

        if (+counter.text() <= 10) stars.html(makestars(5));
        else if (+counter.text() > 10 && +counter.text() <= 13) stars.html(makestars(4));
        else if (+counter.text() > 13 && +counter.text() < 16) stars.html(makestars(3));
        else if (+counter.text() > 16 && +counter.text() <= 19) stars.html(makestars(2));
        else stars.html(makestars(1));
    }

    function checkForWinningTheGame() {
        if ($('.card').length === $('.card.match').length) {
            swal("Good job!", `You Won The game... Your Score is ${$('.moves').text()}`, "success");
        }
    }

    function restart() {
        swal({
            title: "Are you sure?",
            text: "Do You Want To Restart ?, I Know It Is Tough ... Keep Going!",
            icon: "info",
            buttons: true,
        })
            .then((willRestart) => {
                if (willRestart) {
                    // when we restart the click binding is still there .. if click binding is there user can click on cards while cards are shown
                    $('.deck').off('click','.card',cardlogic);
                    init(cardsList);
                    swal("Restarted! Your Game is Restarted", {
                        icon: "success",
                    });
                } else {
                    swal("You Choose Not to Restart!", "That Is Fantastic .. Carry On...", {
                        icon: 'success'
                    });
                }
            });
    }

    /*
     *  - display the card's symbol (put this functionality in another function that you call from this one)
     *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
     *  - if the list already has another card, check to see if the two cards match
     *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
     *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
     *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
     *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
     */

});
