const cards = [
    "Images/c-.png",
    "Images/css-file.png",
    "Images/html.png",
    "Images/java-script.png",
    "Images/programmer.png",
    "Images/python.png",
    "Images/sql-file-symbol.png",
    "Images/typescript.png",
    "Images/c-.png",
    "Images/css-file.png",
    "Images/html.png",
    "Images/java-script.png",
    "Images/programmer.png",
    "Images/python.png",
    "Images/sql-file-symbol.png",
    "Images/typescript.png",
  ];
  
  let shuffledCards = [];
  let flippedCards = [];
  let moves = 0;
  let timer = 0;
  let timerInterval;
  let isTimerRunning = false;
  
  const grid = document.querySelector(".grid");
  const movesDisplay = document.querySelector(".moves");
  const timeDisplay = document.querySelector(".time");
  const restartBtn = document.querySelector(".restart-btn");
  
  function shuffleCards() {
    shuffledCards = [...cards].sort(() => Math.random() - 0.5);
  }
  
  function renderCards() {
    grid.innerHTML = "";
    shuffledCards.forEach((value, index) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.dataset.index = index;
      card.innerHTML = `
              <div class="front">?</div>
              <div class="back">
                  <img src="${value}" alt="Card Image">
              </div>
          `;
      grid.appendChild(card);
    });
  }
  
  function handleCardClick(event) {
    const clickedCard = event.target.closest(".card");
    if (
      !clickedCard ||
      clickedCard.classList.contains("flipped") ||
      flippedCards.length === 2
    )
      return;
  
    if (!isTimerRunning) {
      startTimer();
      isTimerRunning = true;
    }
  
    clickedCard.classList.add("flipped");
    const cardIndex = clickedCard.dataset.index;
    flippedCards.push({ index: cardIndex, value: shuffledCards[cardIndex] });
  
    if (flippedCards.length === 2) {
      checkMatch();
      updateMoves();
    }
  }
  
  function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.value === card2.value) {
      setTimeout(() => {
        const matchedCard1 = document.querySelector(
          `[data-index='${card1.index}']`
        );
        const matchedCard2 = document.querySelector(
          `[data-index='${card2.index}']`
        );
        matchedCard1.classList.add("hidden");
        matchedCard2.classList.add("hidden");
        flippedCards = [];
        checkWin();
      }, 500);
    } else {
      setTimeout(() => {
        document
          .querySelector(`[data-index='${card1.index}']`)
          .classList.remove("flipped");
        document
          .querySelector(`[data-index='${card2.index}']`)
          .classList.remove("flipped");
        flippedCards = [];
      }, 1000);
    }
  }
  
  function updateMoves() {
    moves++;
    movesDisplay.textContent = `Moves: ${moves}`;
  }
  
  function startTimer() {
    timer = 0;
    timeDisplay.textContent = "Time: 0s";
    timerInterval = setInterval(() => {
      timer++;
      timeDisplay.textContent = `Time: ${timer}s`;
    }, 1000);
  }
  
  function stopTimer() {
    clearInterval(timerInterval);
    isTimerRunning = false;
  }
  
  function restartGame() {
    moves = 0;
    flippedCards = [];
    movesDisplay.textContent = "Moves: 0";
    stopTimer();
    timer = 0;
    timeDisplay.textContent = "Time: 0s";
    shuffleCards();
    renderCards();
  }
  
  function checkWin() {
    const allCards = document.querySelectorAll(".card");
    if (
      [...allCards].every(
        (card) =>
          card.classList.contains("flipped") || card.classList.contains("hidden")
      )
    ) {
      stopTimer();
      setTimeout(() => {
        displayWinMessage();
      }, 500);
    }
  }
  
  function displayWinMessage() {
    const winContainer = document.createElement("div");
    winContainer.classList.add("win-container");
    winContainer.innerHTML = `
          <div class="win-message">
              <h1>YOU WIN!🏆</h1>
              <p>Time: ${timer}s</p>
              <p>Moves: ${moves}</p>
              <button class="restart-btn">Restart</button>
          </div>
      `;
    document.body.appendChild(winContainer);
  
    const restartButton = winContainer.querySelector(".restart-btn");
    restartButton.addEventListener("click", () => {
      document.body.removeChild(winContainer);
      restartGame();
    });
  }
  
  function initGame() {
    shuffleCards();
    renderCards();
    stopTimer();
    timer = 0;
    timeDisplay.textContent = "Time: 0s";
    moves = 0;
    movesDisplay.textContent = "Moves: 0";
  }
  
  grid.addEventListener("click", handleCardClick);
  restartBtn.addEventListener("click", restartGame);
  
  initGame();