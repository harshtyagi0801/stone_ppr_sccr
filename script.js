//----------------Buttons-------------------------------------
const ruleBTN = document.querySelectorAll(".rules-btn");
const nxtBTN = document.getElementById("next-btn");
const plyagnBTN = document.querySelector("#play-again");
const rplyBTN = document.querySelector("#replay");
const closeBTN = document.getElementById("close");

//---------------Rules Modal-----------------------------------
const rules = document.getElementById("rules-modal");

//----------------Won Game-------------------------------------
const win = document.querySelector(".won-game");

//----------------Play Board-----------------------------------
const plybord = document.getElementById("play-board");

//---------------ResultBoard-----------------------------------
const rsltbord = document.getElementById("result-board");
const usrRslt = document.querySelector(".user-result");
const compRsult = document.querySelector(".pc-result");
let resultText = document.getElementById("result-text-1");
let resultText2 = document.getElementById("result-text-2");
let select = document.querySelectorAll(".picked");

// ------------------ Score Board-------------------------------
const cmptrScore = document.getElementById("computer-score");
const userScore = document.getElementById("user-score");

// ========| SCORE |=======================================

let score = {
  user: 0,
  computer: 0,
};

if (localStorage.getItem("score")) {
  score = JSON.parse(localStorage.getItem("score"));
}

userScore.innerHTML = score.user;
cmptrScore.innerHTML = score.computer;


// -------------------- RESULT ------------------------------

const result = {
  WIN: "YOU WIN",
  LOST: "YOU LOST",
  TIEUP: "TIE UP",
};

// ==============| EVENT LISTENERS |=============================================================================


ruleBTN.forEach((element) => {
  element.addEventListener("click", () => {
    rules.style.display = "block";
  });
});

closeBTN.addEventListener("click", () => {
  rules.style.display = "none";
});

nxtBTN.addEventListener("click", () => {
  plybord.style.display = "none";
  rsltbord.style.display = "none";
  win.style.display = "flex";
});

plyagnBTN.addEventListener("click", playAgain);

rplyBTN.addEventListener("click", playAgain);


// ================fun=============================


function playAgain() {
  plybord.style.display = "grid";
  rsltbord.style.display = "none";
  win.style.display = "none";
  nxtBTN.style.display = "none";
}

const computer = ["rock", "paper", "scissor"];

function computerPicked() {
  let picked = Math.floor(Math.random() * computer.length);
  return computer[picked];
}

function setImg(picked) {
  let img = `<img src="${picked}.png" alt=${picked} width="60px"/>`;
  return img;
}

function setStyles() {

  rsltbord.style.marginTop = "48px";

  select.forEach((element) => {
    element.style.top = "300px";
  });

  for (let index = 0; index < 3; index++) {
    usrRslt.classList.remove("rock-div");
    usrRslt.classList.remove("paper-div");
    usrRslt.classList.remove("scissor-div");
    compRsult.classList.remove("rock-div");
    compRsult.classList.remove("paper-div"); 
    compRsult.classList.remove("scissor-div");
    plyagnBTN.style.display = "block";
    resultText2.style.display = "block";
    rplyBTN.style.display = "none";
    nxtBTN.style.display = "none";
  }
}
// -----------------------winbox---------------------
let winubox1 = document.querySelector(".user-box-1");
let winubox2 = document.querySelector(".user-box-2");
let winubox3 = document.querySelector(".user-box-3");
let wincombox1 = document.querySelector(".pc-box-1");
let wincombox2 = document.querySelector(".pc-box-2");
let wincombox3 = document.querySelector(".pc-box-3");

let focusOnUserWinner = () => {
  wincombox1.classList.remove("winner-box-1");
  wincombox2.classList.remove("winner-box-2");
  wincombox3.classList.remove("winner-box-3");

  winubox1.classList.add("winner-box-1");
  winubox2.classList.add("winner-box-2");
  winubox3.classList.add("winner-box-3");
};
let focusOnPCWinner = () => {
  winubox1.classList.remove("winner-box-1");
  winubox2.classList.remove("winner-box-2");
  winubox3.classList.remove("winner-box-3");

  wincombox1.classList.add("winner-box-1");
  wincombox2.classList.add("winner-box-2");
  wincombox3.classList.add("winner-box-3");
};

let removeFocus = () => {
  winubox1.classList.remove("winner-box-1");
  winubox2.classList.remove("winner-box-2");
  winubox3.classList.remove("winner-box-3");

  wincombox1.classList.remove("winner-box-1");
  wincombox2.classList.remove("winner-box-2");
  wincombox3.classList.remove("winner-box-3");
};


// ===================== START ================================


const startGame = (userPicked) => {

  let pcPicked = computerPicked();

  setStyles();

  let res;

  if (userPicked === pcPicked) {

    res = result.TIEUP;

    removeFocus();

    plyagnBTN.style.display = "none";
    rplyBTN.style.display = "block";
    resultText2.style.display = "none";

    select.forEach((element) => {
      element.style.top = "256px";
    });

    rsltbord.style.marginTop = "6rem";

  } 
  else if (
    (userPicked === "rock" && pcPicked === "scissor") ||
    (userPicked === "scissor" && pcPicked === "paper") ||
    (userPicked === "paper" && pcPicked === "rock")
  ) {
    res = result.WIN;

    nxtBTN.style.display = "block";

    focusOnUserWinner();

    // updte win
    score.user++;

  } 
  else {
    res = result.LOST;

    focusOnPCWinner();

    // Update loss
    score.computer++;

  }
  plybord.style.display = "none";
  rsltbord.style.display = "flex";

  // rsult
  usrRslt.classList.add(`${userPicked}-div`);
  compRsult.classList.add(`${pcPicked}-div`);
  usrRslt.innerHTML = setImg(userPicked);
  compRsult.innerHTML = setImg(pcPicked);
  resultText.innerHTML = res;

  userScore.innerHTML = score.user;
  cmptrScore.innerHTML = score.computer;
  
  
  localStorage.setItem("score", JSON.stringify(score));
};

// =====================END ===========================



