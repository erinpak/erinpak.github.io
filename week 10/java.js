// For the appearing message on keydown
document.addEventListener('keydown', sayHowdy);

function sayHowdy(e) {
    document.getElementById("hello").innerHTML = "the medium is the massage";
}


