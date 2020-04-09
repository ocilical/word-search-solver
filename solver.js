const solveButton = document.getElementById("solveButton");

class Answer {
    constructor(word, x, y, dir) {
        this.word = word;
        this.x = x;
        this.y = y;
        this.dir = dir;
    }
}

function solvePuzzle() {
    //array of answers
    let answers = [];
    //get and format letter grid
    let grid = document.getElementById("gridInput").value.toLowerCase();
    grid = grid.split("\n");
    grid.forEach((element, index, arr) => {
        arr[index] = element.split("");
    });

    //grid width and height
    let width = grid[0].length;
    let height = grid.length;

    //get array of words to look for
    let words = document.getElementById("wordInput").value.toLowerCase().split(/[ ,]+/);

    //direction arrays
    let dirNames = ["↖", "↑", "↗", "←", "→", "↙", "↓", "↘"];
    let dirsX = [-1, 0, 1, -1, 1, -1, 0, 1];
    let dirsY = [-1, -1, -1, 0, 0, 1, 1, 1];


    for (const word of words) {
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[0].length; j++) {
                if (word.startsWith(grid[i][j])) {
                    const len = word.length;
                    for (let dir = 0; dir < 8; dir++) {
                        let iDir = i;
                        let jDir = j;
                        let pos = 0;
                        for (pos = 0; pos < len; pos++) {
                            if (iDir >= height || iDir < 0 || jDir >= width || iDir < 0) {
                                break;
                            }
                            if (word.charAt(pos) !== grid[iDir][jDir]) {
                                break;
                            }
                            iDir += dirsY[dir];
                            jDir += dirsX[dir];
                            console.log(word)
                        }
                        if(pos === len){
                            answers.push(new Answer(word, i, j, dirNames[dir]))
                        }

                    }
                }
            }
        }

    }


    let table = document.getElementById("answerTable");
    //clear table
    let newBody = document.createElement("tbody");
    let oldBody = table.getElementsByTagName("tbody")[0];
    newBody.setAttribute("id", "tableBody");
    oldBody.parentNode.replaceChild(newBody, oldBody);

    //error message
    if(!answers.length){
        document.getElementById("error").innerHTML = "no matches found!";
        return;
    }
    document.getElementById("error").innerHTML = ""

    //add answers
    for (const ans of answers) {
        let newRow = table.getElementsByTagName("tbody")[0].insertRow(-1);
        newRow.insertCell(-1).innerHTML = ans.word;
        newRow.insertCell(-1).innerHTML = ans.x+1;
        newRow.insertCell(-1).innerHTML = ans.y+1;
        newRow.insertCell(-1).innerHTML = ans.dir;
    }

}

solveButton.addEventListener("click", solvePuzzle);
