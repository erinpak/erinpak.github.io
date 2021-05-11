// First selection

document.getElementById("emotionOne").addEventListener("mouseover", mouseOverHappy)
document.getElementById("emotionOne").addEventListener("mouseout", mouseOutHappy)

function showGifHappy() {
    document.getElementById('previewGifHappy').style.visibility="visible";
}

function hideGifHappy() {
    document.getElementById('previewGifHappy').style.visibility="hidden";
}

function mouseOverHappy() {
    showGifHappy()
}

function mouseOutHappy() {
    hideGifHappy()
}



// Second selection
document.getElementById("emotionTwo").addEventListener("mouseover", mouseOverSad)
document.getElementById("emotionTwo").addEventListener("mouseout", mouseOutSad)

function showGifCry() {
    document.getElementById('previewGifCry').style.visibility="visible";
}

function hideGifCry() {
    document.getElementById('previewGifCry').style.visibility="hidden";
}

function mouseOverSad() {
    showGifCry()
}

function mouseOutSad() {
    hideGifCry()
}



// Third selection
document.getElementById("emotionThree").addEventListener("mouseover", mouseOverDance)
document.getElementById("emotionThree").addEventListener("mouseout", mouseOutDance)

function showGifDance() {
    document.getElementById('previewGifDance').style.visibility="visible";
}

function hideGifDance() {
    document.getElementById('previewGifDance').style.visibility="hidden";
}

function mouseOverDance() {
    showGifDance()
}

function mouseOutDance() {
    hideGifDance()
}



// Fourth selection
document.getElementById("emotionFour").addEventListener("mouseover", mouseOverChill)
document.getElementById("emotionFour").addEventListener("mouseout", mouseOutChill)

function showGifChill() {
    document.getElementById('previewGifChill').style.visibility="visible";
}

function hideGifChill() {
    document.getElementById('previewGifChill').style.visibility="hidden";
}

function mouseOverChill() {
    showGifChill()
}

function mouseOutChill() {
    hideGifChill()
}





// src: https://stackoverflow.com/questions/22327233/show-hide-div-on-mouseover-and-mouseout 
// https://stackoverflow.com/questions/8318591/javascript-addeventlistener-using-to-create-a-mouseover-effect