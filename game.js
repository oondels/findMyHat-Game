const prompt = require("prompt-sync")({ sigint: true });

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

const playGame = (field, key = 0) => {
  field = newField.field;

  // Get user movement
  const move = () => {
    let choice = prompt("Qual direção?");
    return choice;
  };

  const loop = (coord) => {
    switch (true) {
      case coord[0] < newField.getFieldInfo().altura:
        console.log("Voce saiu do campo");
        return (key = 1);
      case coord[0] > newField.getFieldInfo().altura:
        console.log("Voce saiu do campo");
        return (key = 1);

      default:
        break;
    }
  };
  // Move player
  while (key === 0) {
    switch (move().toLowerCase()) {
      case "d":
        newField.getObjectsPositions().player[1] += 1;
        console.log(newField.getObjectsPositions().player);

        break;
      case "a":
        newField.getObjectsPositions().player[1] -= 1;
        console.log(newField.getObjectsPositions().player);
        break;
      case "w":
        newField.getObjectsPositions().player[0] -= 1;
        console.log(newField.getObjectsPositions().player);
        loop(newField.getObjectsPositions().player);
        break;
      case "s":
        newField.getObjectsPositions().player[0] += 1;
        console.log(newField.getObjectsPositions().player);
        loop(newField.getFieldInfo().player);
        break;

      default:
        console.log("Select a real value.");
        break;
    }
  }
};

playGame();
