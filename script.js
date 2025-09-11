let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let winline = document.querySelector(".win-line");
let imgbox = document.querySelector(".imgbox");

let count = 0;
let turn0 = true; // true -> O, false -> X

// [startX, startY, translateX, translateY, rotation]
const winPatterns = [
    [0, 1, 2, 3, 10, 0],
    [3, 4, 5, 3, 30, 0],
    [6, 7, 8, 3, 50, 0],
    [0, 3, 6, 10.5, 3, 90],
    [1, 4, 7, 30, 3, 90],
    [2, 5, 8, 50, 3, 90],
    [0, 4, 8, 10, 9, 47],
    [2, 4, 6, 10, 50, -47],
];

const resetGame = () => {
    turn0 = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
    winline.style.width = '0';
    imgbox.getElementsByTagName("img")[0].style.width = "0";
};

const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
    });
};

const disableBoxes = () => {
    boxes.forEach(box => box.disabled = true);
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn0) {
            let audio1 = new Audio("music/pop.mp3");
            audio1.preload = "auto";
            audio1.play();
            audio1.currentTime = 0.25;
            box.innerHTML = "O";
            box.style.color = "#e07337";
            turn0 = false;
        } else {
            let audio2 = new Audio("music/woosh.mp3");
            audio2.preload = "auto";
            audio2.play();
            audio2.currentTime = 0.2;
            audio2.playbackRate = 1.5;
            box.innerHTML = "X";
            box.style.color = "#0bba25ff";
            turn0 = true;
        }

        count++;
        box.disabled = true;
        checkWinner();
    });
});

const showWinner = (winner) => {
    let audio4 = new Audio("music/applause-sound.mp3");
    audio4.preload = "auto";
    audio4.currentTime = 2;
    audio4.playbackRate = 1.5;
    audio4.play().then(() => {
        setTimeout(() => {
            audio4.pause();
        }, 3000 / audio4.playbackRate);
    });

    imgbox.getElementsByTagName("img")[0].style.width = "100px";
    msg.innerText = `Congratulations 🎉 Winner is ${winner}`;
    msgContainer.classList.remove("hide");

    disableBoxes();
};

const checkWinner = () => {
    let winnerFound = false;

    for (let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val !== "" && pos1val === pos2val && pos2val === pos3val) {
            // Show win line
            winline.style.width = '54vmin';
            winline.style.transform = `translate(${pattern[3]}vmin, ${pattern[4]}vmin) rotate(${pattern[5]}deg)`;
            showWinner(pos1val);
            winnerFound = true;
            break; // Stop checking further
        }
    }

    // Check draw only if no winner
    if (!winnerFound && count === 9) {
        let audio3 = new Audio("music/cartoon-sound.mp3");
        audio3.preload = "auto";
        audio3.play();
        msg.innerText = "🤝 It's a Draw!";
        msgContainer.classList.remove("hide");
        disableBoxes();
    }
};

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
