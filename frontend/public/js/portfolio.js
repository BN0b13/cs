const contactName = document.getElementById('name');
const number = document.getElementById('number');
const email = document.getElementById('email');
const message = document.getElementById('message');
const remainEmpty = document.getElementById('remainEmpty');
const errorDiv = document.getElementById('errorDiv');
const typeDiv = document.getElementById('typeDiv');
const cursorDiv = document.getElementById('cursorDiv');

let cursor = true;

function errorMessage(place, msg) {
  place.innerHTML = `<div class="alert alert-danger" role="alert">${msg}</div>`;
}



function typewriter(sentence) {
  let myArr = [];
  let sentenceHolder = '';

  setInterval(function() {
    cursorDiv.style.opacity = 0;
    cursor = false;
  }, 500);

  setInterval(()=>{
    if(!cursor) {
      cursorDiv.style.opacity = 1;
      cursor = true;
    }
  }, 1001);

  for(i=0; i<sentence.length; i++) {
    myArr.push(sentence.charAt(i));

  }
  setTimeout(()=> {
    for(j=0; j<myArr.length; j++) {
      let timeToStartWriting = 90*j;
      let count = j;
      setTimeout(function(){ 
        sentenceHolder+=myArr[count];
        typeDiv.innerHTML = `
          ${sentenceHolder}
        `;
      }, timeToStartWriting);
    }
  }, 2000);
}

typewriter('OUT OF THIS WORLD GENETICS');