/*  SOLUTION  
We buid the first layeer of the wall in Matrix in which we put every brick like a element with its number.
Than we defines the direction of the bricks. They can be placed horizontaly or verticaly. 
If the brick is with horizontinal direction we add '+' before its number;
If the brick is with vertical direction we add '-' before its number;
Because the Rows and Column are even numbers we can split the first layer matrix on the 2*2 Matrixes beggining with the first row
That we became looping over the first layet starting from the first row and get every 2*2 matrix
That in that 2*2 matrix it can be one of three variations:
    1. To have one whole brick placed horizontaly
    2. To have one whole brick placed verticaly
    3. Not to have whole brick in that 2*2 square matrix
Than we start placing second layer bricks. 
If in the 2*2 matrix the brick are horizontaly we rotate it verticaly and place it in the second layer.
If in the 2*2 matrix the brick are verticaly we rotate it verticaly and place it in the second layer.
If there are no whole brick in this 2*2 matrix there will be no metter how we place the brick in the second layer.
In that way there will be no bricks laying one above other.
*/


function solve(input) {

    //Variables
    let n = input.shift();
    let m = input.shift();

    // ---*** Functions *** --- //

    //Fuction that draws Matrix with the given length filled with '0'
    // --> INPUT --> ROWS and COLUMNS number
    // --> RETURN --> MATRIX filled with '0'
    function drawEmptyMatrix(rows, cols) {
        let matrix = [];
        for (let col = 0; col < cols; col++) {
            matrix[col] = [];
            for (let row = 0; row < rows; row++) {
                matrix[col][row] = 0;
            }
        }
        return matrix;
    }

    //Function that prints Matrix on the separate rows
    // --> INPUT  --> MATRIX
    // --> RETURN --> STRING with Matrix rows on the separate lines
    function printMatrix(matrix) {
        let result = '';
        for (let row = 0; row < matrix[0].length; row++) {
            let rowStr = '';
            for (let col = 0; col < matrix.length; col++) {
                rowStr += matrix[col][row] + ' ';
            }
            result += rowStr + '\n';
        }
        return result;
    }

    // Function thats fills matrix with numbers from Array with rows information from String split by single space
    // --> INPUT --> MATRIX, ARRAY - every element of the Array is row information split by single space
    function fill(matrix, array) {
        for (let row = 0; row < matrix[0].length; row++) {
            for (let col = 0; col < matrix.length; col++) {
                matrix[col][row] = array[row].split(' ')[col];
            }
        }
    }

    //Function that loop over the Matrix and defines direction of the bricks:
    // --> adds '+' to the brick number if the brick is directed horizontaly
    // --> adds '-' to the brick number if the brick is directed vertically
    function checkDirection(matrix) {
        for (let row = 0; row < matrix[0].length; row++) {
            for (let col = 0; col < matrix.length - 1; col++) {
                if (matrix[col][row] == matrix[col + 1][row]) {
                    matrix[col][row] = '+' + matrix[col][row];
                    matrix[col + 1][row] = '+' + matrix[col + 1][row];
                }
            }
        }
        for (let row = 0; row < matrix[0].length; row++) {
            for (let col = 0; col < matrix.length; col++) {
                if (!matrix[col][row].includes('+')) {
                    matrix[col][row] = '-' + matrix[col][row];
                }
            }
        }
    }


    //Function that check if there are a whole brick in the 2*2 matrix. And if there is, rotates it.
    // --> INPUT --> MATRIX - square size 2*2 and a starting brick number
    // --> OUTPUT --> MATRIX - size 2*2 rotated
    function rotateBlocks(square, brickNum) {
        let newSquare = [
            [1, 8],
            [2, 8]
        ]
        if (square[0][0] == square[1][0]) {
            brickNum *= -1;
            newSquare[0][0] = brickNum;
            newSquare[0][1] = brickNum;
            brickNum--;
            newSquare[1][0] = brickNum;
            newSquare[1][1] = brickNum;
        } else if (square[0][0] == square[0][1]) {
            newSquare[0][0] = brickNum;
            newSquare[1][0] = brickNum;
            brickNum++;
            newSquare[0][1] = brickNum;
            newSquare[1][1] = brickNum;
        } else if (square[1][1] == square[1][0]) {
            newSquare[0][0] = brickNum;
            newSquare[1][0] = brickNum;
            brickNum++;
            newSquare[0][1] = brickNum;
            newSquare[1][1] = brickNum;
        } else if (square[1][1] == square[0][1]) {
            brickNum *= -1;
            newSquare[0][0] = brickNum;
            newSquare[0][1] = brickNum;
            brickNum--;
            newSquare[1][0] = brickNum;
            newSquare[1][1] = brickNum;
        } else {
            newSquare[0][0] = brickNum;
            newSquare[1][0] = brickNum;
            newSquare[0][1] = brickNum;
            newSquare[1][1] = brickNum;
        }
        return newSquare;
    }

    //Function that cut a 2*2 sized matrix from bigger matrix
    // --> INPUT --> MATRIX, starting column index and startin row index
    // --> OUTPUT --> retirn MATRIX - sized 2*2 
    function square(matrix, startCol, startRow) {
        let square = [
            [],
            []
        ];
        square[0][0] = matrix[startCol][startRow];
        square[0][1] = matrix[startCol][startRow + 1];
        square[1][0] = matrix[startCol + 1][startRow];
        square[1][1] = matrix[startCol + 1][startRow + 1];
        return square;
    }

    //Function that put 2*2 sized square matrix in the define row and column index of other matrix
    // --> INPUT --> 2*2 sized Matrix, Original Martix, starting column index and starting row index;
    function putSquare(square, matrix, startCol, startRow) {
        matrix[startCol][startRow] = square[0][0];
        matrix[startCol + 1][startRow] = square[1][0];
        matrix[startCol][startRow + 1] = square[0][1];
        matrix[startCol + 1][startRow + 1] = square[1][1];
    }

    //Function that checks the validity of the input
    //The Array with input inormation must have length of rows and every element from array must have length of number of columns
    // --> INPUT --> Number of columns and row and the array with input information
    // --> OUTPUT --> return TRUE or FALSE
    function valididtyInput(cols, rows, array) {
        let isValidInput = true;
        if (array.length != rows) {
            isValidInput = false;
        }
        for (let i = 0; i < array.length; i++) {
            let splitedArray = array[i].split(' ')
            if (splitedArray.length != cols) {
                isValidInput = false;
            }
        }
        return isValidInput;
    }

    //Function that checks of there are a spanning brick
    // --> INPUT --> MATRIX
    // --> OUTPUT --> return TRUE or FALSE
    function spanningBrick(matrix) {
        let isSpanning = false;
        for (let row = 0; row < matrix[0].length; row++) {
            for (let col = 0; col < matrix.length - 3; col++) {
                if (matrix[col][row] == matrix[col + 1][row] == matrix[col + 2][row]) {
                    isSpanning = true;
                }
            }
        }
        for (let col = 0; col < matrix.length; col++) {
            for (let row = 0; row < matrix[0].length - 3; row++) {
                if (matrix[col][row] == matrix[col][row + 1] == matrix[col][row + 2]) {
                    isSpanning = true;
                }
            }
        }
        return isSpanning;
    }

    // ---*** SOLUTION ***--- //
    let result = '';

    //Check tge validity of the input
    if (n % 2 == 0 && m % 2 == 0 && n > 0 && m > 0 && n <= 100 && m <= 100 && valididtyInput(m, n, input)) {


        //Drawing the first layer matrix and fills it with bricks number
        let firstLayerMatrix = drawEmptyMatrix(n, m).slice();
        fill(firstLayerMatrix, input);

        //Check if there are the spanning brick
        if (!spanningBrick(firstLayerMatrix)) {
            //Check direction of every brick and add '+' for horizontaly OR '-' if its verticaly
            checkDirection(firstLayerMatrix);

            //Drawing the empty second layer matrix with the size of first layer
            let secondLayerMatrix = drawEmptyMatrix(n, m).slice();

            //Starting from brick 1 get every 2*2 matrix in the first layermatrix, check its direction, rorate it and place in second layer matrix
            let brickNum = 1;
            for (let startRow = 0; startRow < n; startRow += 2) {
                for (let startCol = 0; startCol < m; startCol += 2) {
                    let squareMatrix = square(firstLayerMatrix, startCol, startRow);
                    let rotateSquare = rotateBlocks(squareMatrix, brickNum);
                    brickNum += 2;
                    putSquare(rotateSquare, secondLayerMatrix, startCol, startRow);
                }
            }
            //Print the second layer matrix
            result = printMatrix(secondLayerMatrix);
        } else {
            result = '-1';
        }
    } else {
        result = '-1';
    }
    console.log(result)
}
