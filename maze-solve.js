const mazeSolve = (maze) => {
  let key = 0;

  const resolve = (row, column) => {
    if (maze[row][column] === "^") {
      maze[row][column] = "ACHOU";
      key += 1;
    } else if (maze[row][column] === "░") {
      maze[row][column] = "*";
      // console.log(maze);
      if (column < maze[row].length - 1) {
        resolve(row, column + 1);
      }
      if (row < maze.length - 1) {
        resolve(row + 1, column);
      }
      if (column > 0) {
        resolve(row, column - 1);
      }
      if (row > 0) {
        resolve(row - 1, column);
      }
    }
  };
  resolve(0, 0);
  return key;
};

module.exports = { mazeSolve };
