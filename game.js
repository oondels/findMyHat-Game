const prompt = require("prompt-sync")({ sigint: true });
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(field) {
    this.field = field;
    this.fieldInfo = {
      largura: 0,
      altura: 0,
    };
    this.objectsPositions = {
      hat: [],
      holes: [],
      player: [0, 0],
    };
  }

  getFieldInfo() {
    return this.fieldInfo;
  }

  getObjectsPositions() {
    return this.objectsPositions;
  }

  print() {
    let joinField = "";

    for (let i = 0; i < this.field.length; i++) {
      if (i > 0) {
        joinField += "\n";
      }

      for (let j = 0; j < this.field[i].length; j++) {
        // Altura e Largura do campo
        this.fieldInfo.altura = this.field.length;
        this.fieldInfo.largura = this.field[i].length;

        joinField += this.field[i][j];
        // Mapeando posição dos buracos e do chapéu
        switch (this.field[i][j]) {
          case "^":
            this.objectsPositions.hat = [i, j];
            break;
          case "O":
            this.objectsPositions.holes.push([i] + [j]);
            break;
          default:
            break;
        }
      }
    }

    return joinField;
  }
}

const newField = new Field([
  ["*", "░", "░", "░"],
  ["░", "O", "░", "O"],
  ["░", "^", "░", "O"],
  ["O", "░", "░", "░"],
]);

const playGame = (field, key = 1) => {
  field = newField.field;

  // Get user movement
  const move = () => {
    readline.question("Where you go?", (choice) => {
      console.log(choice);

      switch (choice.toLowerCase()) {
        case "d":
          newField.getObjectsPositions().player[1] += 1;
          console.log(newField.getObjectsPositions().player);
          break;
        case "a":
          newField.getObjectsPositions().player[1] -= 1;
          console.log(newField.getObjectsPositions().player);
          break;
        case "w":
          newField.getObjectsPositions().player[0] += 1;
          console.log(newField.getObjectsPositions().player);
          break;
        case "s":
          newField.getObjectsPositions().player[0] -= 1;
          console.log(newField.getObjectsPositions().player);
          break;

        default:
          console.log("Select a real value.");
          break;
      }
      readline.close();
    });
  };
  move();
};

playGame();
