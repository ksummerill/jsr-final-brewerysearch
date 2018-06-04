/* REQUIREMENTS from readMe:
Have the AI respond to user input
Do at least 3 different things
One of the commands must utilize the list of people in the class to send a reply (using someone in class just means adding on their name in a message)
Use at least 1 conditional to change the response?
Leverage a for loop to iterate over a collection
Use a random component?
Go above and beyond simple if/else statements
*/



// invoke the opening message: create a function for HAL to open the chat with "Good morning, Dave"
// KS: can use this function to do things when the window loads


var respondToMessage = document.getElementById('hal').innerHTML += message + "<br/>";


window.onload = function() {
// document.getElementById('chatForm').onload
 var openingMessage = ("Good morning, Dave");
  document.getElementById('hal').innerHTML += openingMessage + "<br/>"
}

// add an event listener to the form to submit Dave's message (Sonyl's code)

document.getElementById('chatForm').addEventListener('submit', function(e) {
  e.preventDefault();
  var message = document.getElementById('chatInput').value;

  document.getElementById('dave').innerHTML += message + "<br/>";

  respondToMessage(message);
});

// create a function for HAL to respond to Dave's messages with variable logic based upon Dave's inputs. Must do at least 3 different things.
// KS: this is an example of how to create the inner part of the function

function chatBotInput() {
 if (chatBotInput == "Open the pod bay doors please, HAL") {
    document.getElementById('hal').innerHTML += "I'm sorry Dave, I can't do that. <br/>"
  } else if (chatBotInput == "Who are you, HAL?") {
    document.getElementById('hal').innerHTML += "I'm sorry Dave, I didn't understand you. <br/>"

  }


}
