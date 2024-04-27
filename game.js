const prompt = require("prompt-sync")({ sigint: true });
const { mazeSolve } = require("./maze-solve.js");

class Field {
  constructor(length, height, numHoles) {
    this.length = length;
    this.height = height;
    this.numHoles = numHoles;
    this.field = [];

    this.fieldInfo = {
      largura: 0,
      altura: 0,
    };

    this.objectsPositions = {
      hat: [],
      holes: [],
      player: [
        Math.floor(Math.random() * length),
        Math.floor(Math.random() * height),
      ],
    };
  }

  makeField() {
    // Cosntruct the field (Just the ground)
    for (let i = 0; i < this.length; i++) {
      this.field[i] = [];

      for (let j = 0; j < this.height; j++) {
        this.field[i][j] = "░";
      }
    }

    // Randomize the Holes
    for (let i = 0; i < this.numHoles; i++) {
      this.field[Math.floor(Math.random() * this.length)][
        Math.floor(Math.random() * this.height)
      ] = "O";

      // Place Player
      this.field[this.objectsPositions.player[0]][
        this.objectsPositions.player[1]
      ] = "*";
    }

    // Randomzie the Hat
    this.field[Math.floor(Math.random() * this.length)][
      Math.floor(Math.random() * this.height)
    ] = "^";
    return this.field;
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

const playGame = (key = 0) => {
  let lengthField = parseInt(prompt("Qual a largura do campo?"), 10);
  let heightField = parseInt(prompt("Qual a altura do campo?"), 10);
  let numHoles = parseInt(prompt("Qual a quantidade de buracos?"), 10);

  let newField = new Field(heightField, lengthField, numHoles);

  // Fazer teste do campo em outro local, auqi esta dando erro
  if (mazeSolve(newField.makeField()) === 1) {
    // Log the start field
    console.log(`\n${newField.print()}`);

    // Show Informations about field
    console.log(
      `\n\tO campo atual tem uma largura de ${
        newField.getFieldInfo().largura
      } e altura de ${newField.getFieldInfo().altura}`
    );
    console.log("\n\tEvite os Buracos e encontre seu chapéu, boa sorte!");

    // Get user getUserChoicement
    const getUserChoice = () => {
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
      // Search Hole or Hat
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

    // getUserChoice player
    while (key === 0) {
      switch (getUserChoice().toLowerCase()) {
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
  }
};

playGame();

// const newField = new Field(5, 5, 2);
// newField.makeField();
// console.log(mazeSolve(newField.field));
