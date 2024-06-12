document.addEventListener("DOMContentLoaded", function () {
    let panelBottom = document.getElementById("panelBottom");
    let scoreBox = document.querySelector(".score");
    let score = 0;

    let textDisplay = document.getElementById("textDisplay");
    let iTab = document.getElementById("iTab");
    iTab.addEventListener("click", function() {
        textDisplay.style.display = textDisplay.style.display === "none" ? "block" : "none";
    });

    function startGame() {
        panelBottom.innerHTML = "";
        let description = document.createElement("p");
        description.textContent = "🎨 Welcome to Drop and Drag game! 🚀 Dive into a world of creativity and challenge. 🌟 Drag shapes and objects within the given time. Let the fun begin! 🎮";
        description.classList.add("description");
        panelBottom.appendChild(description);
        let startButton = document.createElement("button");
        startButton.id = "startButton";
        startButton.classList.add("startButton");
        startButton.textContent = "Start Game";
        panelBottom.appendChild(startButton);
        startButton.addEventListener("click", function () {
            runningGame();
        });
    }

    function timer() {
        let timerElement = document.querySelector(".timer");
        let time = 91;
        let timerId = setInterval(function () {
            if (time > 0) {
                time--;
                timerElement.textContent = time;
            } else {
                clearInterval(timerId); // Clear the interval when time reaches 0
                endGame();
            }
        }, 1000);
    }

    function runningGame() {
        //timer();
        score = 0;
        scoreBox.textContent = score;
        panelBottom.innerHTML = "";
        panelBottom.style.flexDirection = "row";
        panelBottom.style.justifyContent = "space-evenly";

        let close = document.getElementById("close");
        close.addEventListener("click", function () {
            window.close();
            //startGame();
        })

        const dragPane = document.createElement('div');
        dragPane.id = 'dragPane';
        dragPane.classList.add('dragPane');
        panelBottom.appendChild(dragPane);

        function getRandomImage() {
            let images = ["coin.png", "crown.png", "diamond.png", "fire.png", "heart.png", "key.png"];
            let index = Math.floor(Math.random() * images.length);
            return images[index]; // Return the image path
        }

        let draggedElement = null; // Reference to the dragged element

        for (let i = 0; i < 108; i++) {
            let dragPiece = document.createElement("div");
            dragPiece.classList.add("dragPiece");
            dragPiece.setAttribute("draggable", "true");
            let imageUrl = getRandomImage();
            dragPiece.style.backgroundImage = `url(${imageUrl})`; // Set background image
            dragPiece.dataset.url = imageUrl; // Store the image URL in a data attribute

            dragPiece.addEventListener("dragstart", function (event) {
                draggedElement = dragPiece; // Store reference to the dragged element
                event.dataTransfer.setData('text/plain', imageUrl); // Transfer the image URL
            });
            dragPane.appendChild(dragPiece);
        }

        const dropPane = document.createElement('div');
        dropPane.id = 'dropPane';
        dropPane.classList.add('dropPane');
        panelBottom.appendChild(dropPane);

        // Array of drop classes
        const dropClasses = ['coin', 'crown', 'diamond', 'fire', 'heart', 'key'];

        // Function to create a drop div
        function createDropDiv(className) {
            const dropDiv = document.createElement('div');
            dropDiv.classList.add(className, 'drop');

            const labelDiv = document.createElement('div');
            labelDiv.classList.add('label');
            labelDiv.style.backgroundImage = `url(${className}.png)`;

            const hr = document.createElement('hr');
            hr.setAttribute('size', '3px');

            const dropHereDiv = document.createElement('div');
            dropHereDiv.classList.add('dropHere');

            dropDiv.appendChild(labelDiv);
            dropDiv.appendChild(hr);
            dropDiv.appendChild(dropHereDiv);

            return dropDiv;
        }

        // Append each drop div to the dropPane
        dropClasses.forEach(className => {
            const dropDiv = createDropDiv(className);
            dropPane.appendChild(dropDiv);
        });

        dropPane.addEventListener("dragover", function (event) {
            event.preventDefault();
        });

        dropPane.addEventListener("drop", function (event) {
            event.preventDefault(); // Prevent default behavior
            const droppedUrl = event.dataTransfer.getData('text/plain');
            const targetDropDiv = event.target.closest('.drop');

            if (targetDropDiv) {
                const targetClass = targetDropDiv.className.split(' ')[0];
                const targetLabelUrl = `${targetClass}.png`;

                if (droppedUrl === targetLabelUrl) {
                    draggedElement.classList.add('dragPiece');
                    targetDropDiv.querySelector('.dropHere').appendChild(draggedElement);
                    score += 5;
                    scoreBox.textContent = score;
                    draggedElement = null; // Clear the reference to the dragged element
                }
            }
        });
    }

    function endGame() {
        panelBottom.innerHTML = "";
        panelBottom.style.justifyContent = "center";
        panelBottom.style.flexDirection = "column";
        panelBottom.style.position = "relative";
        let gameOver = document.createElement("p");
        gameOver.classList.add("gameOver");
        gameOver.textContent = "Game Over!";
        let yourScore = document.createElement("p");
        yourScore.classList.add("yourScore");
        yourScore.textContent = "Your Score: " + score;
        let playAgain = document.createElement("button");
        playAgain.classList.add("playAgain");
        playAgain.textContent = "Play Again";
        playAgain.addEventListener("click", function () {
            runningGame();
        });
        let exitButton = document.createElement("button");
        exitButton.classList.add("exitButton");
        exitButton.textContent = "Exit";
        exitButton.addEventListener("click", function () {
            window.close();
        });
        panelBottom.appendChild(gameOver);
        panelBottom.appendChild(yourScore);
        panelBottom.appendChild(playAgain);
        panelBottom.appendChild(exitButton);
    }

    startGame();
    // runningGame();
});
