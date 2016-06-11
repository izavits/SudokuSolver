									
var printRes=function printRes(puzzle) {
	console.log("+-----+-----+-----+");

	for (var i=1; i<10; i++) {
		for (var j=1; j<10; j++) {
			process.stdout.write("|"+puzzle[i-1][j-1]);
		}
		console.log("|");
		if (i%3 === 0) {
			console.log("+-----+-----+-----+");
		}
	}
};

var avail=function avail(puzzle, row, col, num) {
	var rowStart = Math.floor(row / 3) * 3;
	var colStart = Math.floor(col / 3) * 3;

	for (var i = 0; i<9; i++) {
		if (puzzle[row][i]===num) {
			return false;
		}
		if (puzzle[i][col]===num) {
			return false;
		}
		if (puzzle[rowStart+(i%3)][colStart+(i/3)]===num) {
			return false;
		}
	}
	return true;
};

var solve=function solve(puzzle, row, col) {
	if (row<9 && col<9) {
		if (puzzle[row][col] != 0) {
			if ((col+1)<9) {
				return solve(puzzle, row, col+1);
			}
			else if ((row+1)<9) {
				return solve(puzzle, row+1, 0);
			}
			else {
				return true;
			}
		}
		else {
			for (var i=0; i<9; i++) {
				if (avail(puzzle, row, col, i+1)) {
					puzzle[row][col]=i+1;
					if ((col+1)<9) {
						if (solve(puzzle, row, col + 1)) {
							return true;
						}
						else {
							puzzle[row][col]=0;
						}
					}
					else if ((row + 1) < 9) {
						if (solve(puzzle, row+1, 0)) {
							return true;
						}
						else {
							puzzle[row][col]=0;
						}
					}
					else return true;
				}
			}
		}
		return false;
	}
	else return true;
};


// Example
var puzzle=[
	[ 3, 2, 1, 7, 0, 4, 0, 0, 0 ],
	[ 6, 4, 0, 0, 9, 0, 0, 0, 7 ],
	[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
	[ 0, 0, 0, 0, 4, 5, 9, 0, 0 ],
	[ 0, 0, 5, 1, 8, 7, 4, 0, 0 ],
	[ 0, 0, 4, 9, 6, 0, 0, 0, 0 ],
	[ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
	[ 2, 0, 0, 0, 7, 0, 0, 1, 9 ],
	[ 0, 0, 0, 6, 0, 9, 5, 8, 2 ]
];
									

if (solve(puzzle, 0, 0))
	printRes(puzzle);

								
