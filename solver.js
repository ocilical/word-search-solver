const solveButton = document.getElementById("solveButton");

class Answer {
    constructor(word, x, y, dir) {
        this.word = word;
        this.x = x;
        this.y = y;
        this.dir = dir;
    }
}

function solvePuzzle(){
    //array of answers
    let answers = [];
    //get and format letter grid
    let grid = document.getElementById("gridInput").value;
    grid = grid.split("\n");
    grid.forEach((element, index, arr) => {
        arr[index] = element.split("");
    });

    //get array of words to look for
    let words = document.getElementById("wordInput").value.split(/[ ,]+/);
    
    //find horizontal occurences


}

solveButton.addEventListener("click", solvePuzzle);