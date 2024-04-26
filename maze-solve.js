const mazeEx = [
  ["░", "░", "O", "░"],
  ["░", "░", "O", "░"],
  ["░", "░", "░", "░"],
  ["░", "░", "O", "O"],
  ["O", "░", "░", "H"],
];

const mazeSolve = (maze, key = 0) => {
  const player = [0, 0];
  console.log(maze[player[0]][player[1]]);

  const checkSides = (coord) => {
    const subir = [coord[0] + 1][coord[1]];
    const descer = [coord[0] - 1][coord[1]];
    const direita = [coord[0]][coord[1] + 1];
    const esquerda = [coord[0]][coord[1] + 1];
    // Check Up
    if (maze[subir]) {
      if (maze[subir] != "O") {
        return (player[0] += 1);
      }
    } else if (maze[descer]) {
      if (maze[descer] != "O") {
        return (player[0] -= 1);
      }
    } else if (maze[direita]) {
      if (maze[direita] != "O") {
        return (player[1] += 1);
      }
    } else if (maze[esquerda]) {
      if (maze[esquerda] != "O") {
        return (player[1] -= 1);
      }
    }
  };

  while (key === 0) {
    if (maze[player[0]][player[1]] === "H") {
      console.log("Parabens!");
      key = 1;
    } else if (maze[player[0]][player[1]] === "O") {
      maze[player[0]][player[1]] = "*";
      console.log(maze);
      checkSides(player);
    }
  }
};

mazeSolve(mazeEx);
