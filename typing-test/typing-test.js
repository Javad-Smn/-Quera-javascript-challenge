const TIME_LIMIT = 60;
const TEXT =
  "سعی نکنید همه چیز را بدانید. شما ممکن است خیلی چیزها را دیده و انجام داده باشید، اما لزوما به این معنی نیست که شما می دانید بهترین است. سعی نکنید به مردم بگویید که چگونه می توانند کارها را به شیوه ای بهتر انجام دهند یا اینکه بهتر می توانند کاری انجام دهند.";

let wpmText = document.getElementById("wpm");
let errorText = document.getElementById("errors");
let timerText = document.getElementById("time");
let accuracyText = document.getElementById("accuracy");
let typeText = document.getElementById("type-text");
let textArea = document.getElementById("textarea");

let timeLeft = 0;
let timeElapsed = 0;
let errors = 0;
let accuracy = 0;
let typedCharacter = 0;
let timer = null;
let hasStarted = false;

initializeTest({ timeLimit: TIME_LIMIT, text: TEXT });

textArea.addEventListener("input", update);

function initializeTest({ timeLimit, text }) {
  document.querySelector("#time").innerHTML = timeLimit;
  textArea.innerHTML = '';
  text.split('').forEach(c => {
    typeText.innerHTML += `<span>${c}</span>`
  });
}

function update(e) {
  if (!hasStarted) {
    timer = setInterval(updateTimer, 1000);
    hasStarted = true;
  }
  typedCharacter++;
  updateCharactersStatus(e);
  updateErrors();
  updateAccuracy();
}

function updateCharactersStatus(e) {
  const textLength = typeText.children.length;
  const typeLength = textArea.value.length;
  let spans = document.querySelectorAll("#type-text span");
  let letters = [...e?.target?.value]?.filter(c => c);
  let letterNum = letters?.length-1;

  spans.forEach( (span, i) => {
    if(i > letterNum) span.className = '';
  });

  letters.forEach( (l, i) => {
    if(l === spans[i].innerHTML) {
      spans[letterNum].className = "correct-char";
    } else {
      spans[letterNum].className = "incorrect-char";
    }
  });
  
  if( textLength === typeLength ) {
    finishTest();
    clearInterval(timer);
    return;
  }
}

function updateAccuracy() {
  document.querySelector("#accuracy").innerHTML = Math.ceil(((typedCharacter-errors)/typedCharacter)*100);
}

function updateErrors() {
  errors = document.querySelectorAll(".incorrect-char").length;
  document.querySelector("#errors").innerHTML = errors;
}

function updateWpm() {
  timeElapsed = 60 - timeLeft;
  if( typedCharacter !== 1 ) {
    document.querySelector("#wpm").innerHTML = Math.ceil( ((typedCharacter/5)/timeElapsed)*60 );
  } else {
    document.querySelector("#wpm").innerHTML = 0;
  }
}

function updateTimer() {
  timeLeft = document.querySelector("#time").innerHTML;
  updateWpm();
  if( timeLeft == 0 ) {
    finishTest();
    clearInterval(timer);
    return;
  }
  document.querySelector("#time").innerHTML-= 1;
}

function finishTest() {
  document.querySelector("#textarea").disabled = true;
}
