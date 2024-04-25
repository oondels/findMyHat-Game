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
    this.print();
    return this.fieldInfo;
  }

  getObjectsPositions() {
    this.print();
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
  ["O", "░", "░", "░"],
]);

const playGame = (field, key = 0) => {
  console.log(newField.print());
  // Get user movement
  const move = () => {
    let choice = prompt("Qual direção?");
    return choice;
  };

  const loopField = (coord) => {
    switch (true) {
      case coord[0] <= -1:
        console.log("Voce saiu do campo");
        return (key = 1);
      case coord[0] >= newField.getFieldInfo().altura:
        console.log("Voce saiu do campo");
        return (key = 1);
      case coord[1] >= newField.getFieldInfo().largura:
        console.log("Voce saiu do campo");
        return (key = 1);
      case coord[1] <= -1:
        console.log("Voce saiu do campo");
        return (key = 1);

      default:
        break;
    }
  };

  const findHatHole = (coord) => {
    switch (true) {
      case coord === "O":
        console.log("\t\tVocê caiu em um buraco!");
        return (key = 1);
      case coord === "^":
        console.log("\t\tParbêns!!\n\t\tVocê achou seu chapéu!!");
        return (key = 1);
      default:
        break;
    }
  };

  const walk = () => {
    findHatHole(
      newField.field[newField.getObjectsPositions().player[0]][
        newField.getObjectsPositions().player[1]
      ]
    );
    // Replace ground with player postion
    newField.field[newField.getObjectsPositions().player[0]][
      newField.getObjectsPositions().player[1]
    ] = "*";
    loopField(newField.getObjectsPositions().player);
    // Print the att Field
    console.log(newField.print());
  };

  // Move player
  while (key === 0) {
    switch (move().toLowerCase()) {
      case "d":
        newField.getObjectsPositions().player[1] += 1;
        walk();
        break;
      case "a":
        newField.getObjectsPositions().player[1] -= 1;
        walk();
        break;
      case "w":
        newField.getObjectsPositions().player[0] -= 1;
        try {
          walk();
        } catch (error) {
          console.log("\t\tVocê saiu do campo");
          key = 1;
        }
        break;
      case "s":
        newField.getObjectsPositions().player[0] += 1;
        try {
          walk();
        } catch (error) {
          console.log("\t\tVocê saiu do campo");
          key = 1;
        }
        break;
      default:
        console.log("\t\tSelect a real value.");
        break;
    }
  }
};

playGame();
