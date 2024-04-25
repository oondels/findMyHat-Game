// const prompt = require("prompt-sync")({ sigint: true });
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
  }
  print() {
    let joinField = "";
    let fieldInfo = {
      largura: 0,
      altura: 0,
    };
    let objectsPositions = {
      hat: [],
      holes: [],
    };
    for (let i = 0; i < this.field.length; i++) {
      if (i > 0) {
        joinField += "\n";
      }
      // Altura do campo
      fieldInfo.altura = this.field.length;

      for (let j = 0; j < this.field[i].length; j++) {
        // Largura do campo
        fieldInfo.largura = this.field[i].length;
        joinField += this.field[i][j];

        // Mapeando posição dos buracos e do chapéu
        switch (this.field[i][j]) {
          case "^":
            objectsPositions.hat = [i, j];
            break;
          case "O":
            objectsPositions.holes.push([i] + [j]);
            break;
          default:
            break;
        }
      }
    }
    // Debug
    console.log(
      `Posição do Chapéu: ${objectsPositions.hat} e Posições dos Buracos: ${objectsPositions.holes}`
    );
    console.log(`Largura: ${fieldInfo.largura} e Altura: ${fieldInfo.altura}`);
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
  while (key === 1) {
    readline.question("Where you go?", (choice) => {
      console.log(choice);
      readline.close();
      // continue here
    });
  }
};

console.log(newField.print());
playGame();
