console.log("the message!");


let theBody = document.querySelector('body');
let theTomato = document.getElementById('tomato');
let theTomahto = document.getElementById('tomahto')
let theTitle = document.querySelector('h1');
let theRightButtonText = document.querySelector('h2');
let theButtonText = document.querySelector('p');
 
// 'event listener' is the action
theTomato.addEventListener('click', rainyDay);
theTomahto.addEventListener('click', rainMoney);


function rainyDay() {
    console.log("you did it!! 🤩");
    theBody.style.backgroundImage = 'url(https://i.pinimg.com/originals/e6/4b/01/e64b01fa45fc51c9e1afc255b701c81a.jpg)';
    theTitle.textContent = "you made it rainy!";
    theTitle.style.color = "red";
    theButtonText.textContent = "yay";
}

function rainMoney() {
    console.log("yaayyyyyyyy");
    theBody.style.backgroundImage = 'url(https://pbs.twimg.com/media/Cr2y6xsWEAAbmki.jpg)';
    theTitle.textContent = "you made it rain!";
    theTitle.style.color = "green";
    theRightButtonText.textContent = "woo!";
}


//ES6 arrow notation - a new and faster functiuon syntax
document.addEventListener('keydown', theEvent => {
    console.log("you pressed a key!");
})