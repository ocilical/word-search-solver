const solveButton = document.getElementById("solveButton");

class Answer {
    constructor(word, x, y, dir) {
        this.word = word;
        this.x = x;
        this.y = y;
        this.dir = dir;
    }
}

function reverseString(str) {
    return str.split("").reverse().join("");
}

//get column of 2d array
function getCol(arr, col) {
    let column = [];
    for (let r = 0; r < arr.length; r++) {
        column.push(arr[r][col]);
    }
    return column;
}

function solvePuzzle() {
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

    for (const word of words) {
        //check horizontal
        for (let i = 0; i < grid.length; i++) {
            let row = grid[i].join("");
            //forward
            if (row.includes(word)) {
                answers.push(new Answer(word, row.indexOf(word), i, "right"));
            }
            //backwards
            if (reverseString(row).includes(word)) {
                answers.push(new Answer(word, row.length - (reverseString(row).indexOf(word) + 1), i, "left"))
            }
        }

        //check vertical
        for (let i = 0; i < grid[0].length; i++) {
            let col = getCol(grid, i).join("");
            console.log(col);
            //down
            if (col.includes(word)) {
                answers.push(new Answer(word, i, col.indexOf(word), "down"));
            }
            //up
            if (reverseString(col).includes(word)) {
                answers.push(new Answer(word, i, col.length - (reverseString(col).indexOf(word) + 1), "up"))
            }
        }

    }


    let table = document.getElementById("answerTable");
    //clear table
    let newBody = document.createElement("tbody");
    let oldBody = table.getElementsByTagName("tbody")[0];
    newBody.setAttribute("id", "tableBody");
    oldBody.parentNode.replaceChild(newBody, oldBody);

    //add answers
    for (const ans of answers) {
        let newRow = table.getElementsByTagName("tbody")[0].insertRow(-1);
        newRow.insertCell(-1).innerHTML = ans.word;
        newRow.insertCell(-1).innerHTML = ans.x;
        newRow.insertCell(-1).innerHTML = ans.y;
        newRow.insertCell(-1).innerHTML = ans.dir;
    }

}



solveButton.addEventListener("click", solvePuzzle);